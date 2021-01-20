/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Components & Helpers */
import FeedList from './components/FeedList/FeedList';
import PostForm from './components/PostForm/PostForm';
import NoData from '../../components/NoData/NoData';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/layout/Loader/Loader';
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import {
	addPostToFB,
	deletePostFromFB,
	editPostInFB,
} from '../../store/actions/posts';
import { addFlashMessage } from '../../store/actions/flashMessages';
import { FB, MESSAGE, CONFIRM } from './constants/index';
import db from '../../config/fbConfig';
import './Feed.css';

/** MUI */
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/** Feed displays a list of latest Posts
 *  Feed -> FeedList -> PostCard
 */
export function Feed() {
	const dispatch = useDispatch();
	const [posts, setPosts] = useState([]);

	/** Get user data */
	const currentUser = useSelector((state) => state.auth.user);

	const [isLoading, setIsLoading] = useState(true);
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		// get data from 'feed' collection
		const getData = async () => {
			await db
				.collection(FB.collection)
				.orderBy(FB.orderBy, FB.order)
				.get()
				.then((data) => {
					setPosts(
						data.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				})
				.catch((err) => console.log(err))
				.finally(() => setIsLoading(false));
		};

		if (isLoading) {
			getData();
		}
	}, [isLoading]);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const setFlashMessages = (message, type) => {
		dispatch(
			addFlashMessage({
				isOpen: true,
				message,
				type,
			})
		);
	};

	const addPost = (postData) => {
		dispatch(addPostToFB(postData));
		setShowForm(false);
		setFlashMessages(MESSAGE.addPost, MESSAGE.success);
		// get most recent posts
		setIsLoading(true);
	};

	/** Prompts Confirmation Dialog to Delete Post*/
	const deletePostPrompt = (id, image) => {
		setConfirmDialog({
			isOpen: true,
			title: CONFIRM.title,
			subtitle: CONFIRM.subtitle,
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
		setFlashMessages(MESSAGE.deletePost, MESSAGE.error);
		// get most recent posts
		setIsLoading(true);
	};

	/** Updates Post */
	const editPost = (id, data) => {
		dispatch(editPostInFB(id, data));
		setFlashMessages(MESSAGE.updatePost, MESSAGE.success);
		// get most recent posts
		setIsLoading(true);
	};

	if (showForm) {
		return (
			<Modal
				isOpen={showForm}
				content={<PostForm save={addPost} />}
				closeModal={toggleForm}
				full={true}
			/>
		);
	}

	return (
		<div className="Feed">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
				type="error"
			/>
			<div className="Feed-Header Body-Header hide-sm">
				<h5>Feed</h5>
			</div>
			<div className="Feed__List">
				{isLoading ? <Loader /> : null}
				{posts.length === 0 && !isLoading ? (
					<NoData text="posts" />
				) : (
					<FeedList posts={posts} remove={deletePostPrompt} edit={editPost} />
				)}
			</div>
			<Fab id="Feed-Add-Post-Btn" aria-label="add">
				<AddIcon onClick={toggleForm} />
			</Fab>
		</div>
	);
}
