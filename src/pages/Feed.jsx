/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import FeedList from '../components/Feed/FeedList';
import PostForm from '../components/Feed/PostForm';
import NoData from '../components/general/NoData';
import Modal from '../components/general/Modal';
import ConfirmDialog from '../components/general/ConfirmDialog';
import { addPostToFB, deletePostFromFB } from '../store/actions/posts';
import { addFlashMessage } from '../store/actions/flashMessages';
import db from '../config/fbConfig';
import './styles/Feed.css';

/** MUI */
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

/** Feed displays a list of latest Posts
 *  Feed -> FeedList -> PostCard
 */
function Feed() {
	const dispatch = useDispatch();
	const [posts, setPosts] = useState([]);

	// Flag to keep track of refreshing most recent data
	const [fetchData, setFetchData] = useState(true);
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		// get data from 'feed' collection
		const getData = async () => {
			 await db.collection('feeds')
				.orderBy('timestamp', 'desc').get()
				.then((data) => {
					setPosts(
							data.docs.map((doc) => ({
								id: doc.id,
								data: doc.data(),
							})));
				}).catch(err => console.log(err));
			// db.collection('feeds')
			// .orderBy('timestamp', 'desc')
			// .onSnapshot((data) => {
			// 	setPosts(
			// 			data.docs.map((doc) => ({
			// 				id: doc.id,
			// 				data: doc.data(),
			// 			})));
			// });

			// Flag to keep track of refreshing most recent data
			setFetchData(false);
		}

		if(fetchData){
			getData();
		}
	}, [fetchData]);

	// Toggle form for User to Add Course
	const [showForm, setShowForm] = useState(false);
	const toggleForm = () => setShowForm((show) => !show);

	const addPost = (postData) => {
		dispatch(addPostToFB(postData));
		setShowForm(false);
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Post Successful!',
				type: 'success',
			})
		);
		// get most recent posts
		setFetchData(true);
	};

	/** Prompts Confirmation Dialog to Delete Post*/
	const deletePostPrompt = (id) => {
		setConfirmDialog({
			isOpen: true,
			title: 'Are you sure you want to remove this post?',
			subtitle: "You can't undo this operation",
			onConfirm: () => {
				deletePost(id);
			},
		});
	};

	/** Delete Post */
	const deletePost = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deletePostFromFB(id));
		dispatch(
			addFlashMessage({
				isOpen: true,
				message: 'Removed Post',
				type: 'error',
			})
		);
		// get most recent posts
		setFetchData(true);
	};

	if (showForm) {
		return (
			<Modal
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
			<div className="Feed__List">
				{posts.length > 0 ? (
					<FeedList posts={posts} remove={deletePostPrompt} setFetchData={setFetchData}/>
				) : (
					<NoData text="posts" />
				)}
			</div>
			<Fab id="Feed-Add-Post-Btn" aria-label="add">
				<AddIcon onClick={toggleForm} />
			</Fab>
		</div>
	);
}

export default Feed;
