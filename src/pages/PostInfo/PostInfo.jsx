/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/** Components & Helpers */
import BackButton from '../../components/BackButton/BackButton';
import PostCard from '../Feed/components/Card/PostCard';
import ChatFooter from '../../components/ChatFooter/ChatFooter';
import NoData from '../../components/NoData/NoData';
import CommentsList from './components/List/CommentsList';
import {
	addCommentToPost,
	deleteCommentFromPost,
	deletePostFromFB,
	editPostInFB,
} from '../../store/actions/posts';
import { addFlashMessage } from '../../store/actions/flashMessages';
import Notification from '../../components/Notification/Notification';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import {
	INITIAL_STATE_NOTIFY,
	INITIAL_STATE_CONFIRM_DIALOG,
	FB,
	MESSAGE,
	CONFIRM,
	CONFIRM_POST,
} from './constants/index';
import db from '../../config/fbConfig';
import './PostInfo.css';

/** Displays PostInfo
 *  Feed -> PostInfo
 */
export function PostInfo() {
	const dispatch = useDispatch();
	const { postId } = useParams();
	const currentUser = useSelector((state) => state.auth.user);

	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);

	const [notify, setNotify] = useState(INITIAL_STATE_NOTIFY);
	const [confirmDialog, setConfirmDialog] = useState(
		INITIAL_STATE_CONFIRM_DIALOG
	);

	useEffect(() => {
		/** Get Post Info */
		const getData = () => {
			db.collection(FB.collection)
				.doc(postId)
				.onSnapshot((snapshot) => setPost(snapshot.data()));

			/** Get Post Comments */
			db.collection(FB.collection)
				.doc(postId)
				.collection(FB.subCollection)
				.orderBy(FB.orderBy, FB.order)
				.onSnapshot((snapshot) =>
					setComments(
						snapshot.docs.map((doc) => {
							return { id: doc.id, data: doc.data() };
						})
					)
				);
		};
		if (postId) {
			getData();
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
			title: CONFIRM.title,
			subtitle: CONFIRM.subtitle,
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
		setNotify({
			isOpen: true,
			message: MESSAGE.deleteComment,
			type: MESSAGE.error,
		});
	};

	const editComment = (id) => {
		console.log('editing...', postId, id);
	};

	/** Prompts Confirmation Dialog to Delete Post*/
	const deletePostPrompt = (id, image) => {
		setConfirmDialog({
			isOpen: true,
			title: CONFIRM_POST.title,
			subtitle: CONFIRM_POST.subtitle,
			onConfirm: () => {
				deletePost(id, image);
			},
		});
	};

	/** Delete Post */
	const deletePost = (id, image) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deletePostFromFB(id, currentUser.uid, image));
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: MESSAGE.deletePost,
				type: MESSAGE.error,
			})
		);
	};

	/** Updates Post */
	const editPost = (id, data) => {
		dispatch(editPostInFB(id, data));
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: MESSAGE.updatePost,
				type: MESSAGE.success,
			})
		);
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
					{post.type === ''
						? 'Post'
						: post.type.charAt(0).toUpperCase() + post.type.slice(1)}
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
						last_updated={post.last_updated}
						comments={post.num_of_comments}
						isBookmarked={false}
						remove={deletePostPrompt}
						edit={editPost}
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
