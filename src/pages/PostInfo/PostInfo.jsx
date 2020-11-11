/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import BackButton from '../../components/BackButton/BackButton';
import PostCard from '../Feed/components/PostCard/PostCard';
import ChatFooter from '../../components/ChatFooter/ChatFooter';
import NoData from '../../components/NoData/NoData';
import CommentsList from './components/CommentsList/CommentsList';
import {
	addCommentToPost,
	deleteCommentFromPost,
} from '../../store/actions/posts';
import Notification from '../../components/Notification/Notification';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import db from '../../config/fbConfig';
import './PostInfo.css';

/** Displays PostInfo
 *  Feed -> PostInfo
 */
function PostInfo() {
	const dispatch = useDispatch();
	const { postId } = useParams();
	// const currentUser = useSelector((state) => state.auth.user);

	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);

	const [notify, setNotify] = useState({
		isOpen: false,
		message: '',
		type: '',
	});
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		/** Get Post Info */
		if (postId) {
			db.collection('feeds')
				.doc(postId)
				.onSnapshot((snapshot) => setPost(snapshot.data()));

			/** Get Post Comments */
			db.collection('feeds')
				.doc(postId)
				.collection('comments')
				.orderBy('createdAt', 'desc')
				.onSnapshot((snapshot) =>
					setComments(
						snapshot.docs.map((doc) => {
							return { id: doc.id, data: doc.data() };
						})
					)
				);
		}
	}, [postId]);

	if (!post) {
		return <p>Loading...</p>;
	}

	/** Sends Comment from ChatFooter */
	const sendComment = (data) => {
		try {
			dispatch(addCommentToPost(postId, data));
		} catch (err) {
			console.log(err);
		}
	};

	/** Prompts Confirmation Dialog to Delete Comment */
	const deleteCommentPrompt = (id) => {
		setConfirmDialog({
			isOpen: true,
			title: 'Are you sure you want to remove this comment?',
			subtitle: "You can't undo this operation",
			onConfirm: () => {
				deleteComment(id);
			},
		});
	};

	/** Delete Comment */
	const deleteComment = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteCommentFromPost(postId, id));
		setNotify({ isOpen: true, message: 'Removed Comment', type: 'error' });
	};

	const editComment = (id) => {
		console.log('editing...', postId, id);
	};

	return (
		<div className="PostInfo">
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<div className="PostInfo__Header bottom-border-header Body-Header">
				<BackButton />
				<h5 className="text-center">
					{post.type
						? post.type.charAt(0).toUpperCase() + post.type.slice(1)
						: 'Post'}
				</h5>
			</div>
			<div className="PostInfo__Body">
				<div className="PostInfo__Post">
					<PostCard
						id={postId}
						key={postId}
						title={post.title}
						username={post.username}
						userId={post.userId}
						avatar={post.avatar}
						description={post.description}
						location={post.location}
						type={post.type}
						start={post.start}
						end={post.end}
						attachment_preview={post.attachment_preview}
						attachment={post.attachment}
						timestamp={post.timestamp}
						comments={post.num_of_comments}
						isBookmarked={false}
					/>
				</div>
				<div id="PostInfo__CommentList" className="PostInfo__CommentList">
					{comments ? (
						<CommentsList
							postId={postId}
							comments={comments}
							remove={deleteCommentPrompt}
							edit={editComment}
						/>
					) : (
						<NoData text="comments" />
					)}
				</div>
			</div>

			<div className="PostInfo__Footer">
				<ChatFooter send={sendComment} type={'comment'} />
			</div>
		</div>
	);
}

export default PostInfo;
