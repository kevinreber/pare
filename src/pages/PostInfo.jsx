/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import BackButton from '../components/general/BackButton';
import PostCard from '../components/Feed/PostCard';
import ChatFooter from '../components/general/ChatFooter';
import NoData from '../components/general/NoData';
import CommentsList from '../components/PostInfo/CommentsList';
import {
	addCommentToPost,
	deleteCommentFromPost,
} from '../store/actions/posts';
import Notification from '../components/general/Notification';
import ConfirmDialog from '../components/general/ConfirmDialog';
import db from '../config/fbConfig';
import './styles/PostInfo.css';

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
				.orderBy('timestamp', 'desc')
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
		<div className='PostInfo'>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
			<div className='PostInfo__Header bottom-border-header Body-Header'>
				<BackButton />
				<h5 className='text-center'>{post.type ? post.type : 'Post'}</h5>
			</div>
			<div className='PostInfo__Body'>
				<div className='PostInfo__Post'>
					<PostCard
						id={postId}
						key={postId}
						title={post.title}
						username={post.username}
						user_id={post.userId}
						avatar={'https://randomuser.me/api/portraits/thumb/women/75.jpg'}
						description={post.description}
						location={post.location}
						type={post.type}
						start={post.start}
						end={post.end}
						attachment_preview={post.attachment_preview}
						attachment={post.attachment}
						timestamp={post.timestamp}
						comments={[]}
						isBookmarked={false}
					/>
				</div>
				<div id='PostInfo__CommentList' className='PostInfo__CommentList'>
					{comments ? (
						<CommentsList
							postId={postId}
							comments={comments}
							remove={deleteCommentPrompt}
							edit={editComment}
						/>
					) : (
						<NoData text='comments' />
					)}
				</div>
			</div>

			<div className='PostInfo__Footer'>
				<ChatFooter send={sendComment} type={'comment'} />
			</div>
		</div>
	);
}

export default PostInfo;
