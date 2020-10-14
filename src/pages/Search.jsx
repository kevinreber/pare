/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import NoData from '../components/general/NoData';
import CTAButton from '../components/general/CTAButton';
import Searchbar from '../components/general/Searchbar';
import ConfirmDialog from '../components/general/ConfirmDialog';
import { deletePostFromFB } from '../store/actions/posts';
import { addFlashMessage } from '../store/actions/flashMessages';
import db from '../config/fbConfig';
import './styles/Search.css';

/** MUI */
import { List, ListItem, ListItemText } from '@material-ui/core';
import FeedList from '../components/Feed/FeedList';

const SearchCategories = [
	'Alerts',
	'Today',
	'Networking',
	'Campus',
	'Opportunities',
	'Marketplace',
	'Events',
];

function Search() {
	const dispatch = useDispatch();
	const [quickSearch, setQuickSearch] = useState('Today');
	const toggleQuickSearch = (e) => {
		setPosts([]);
		setQuickSearch(e.target.innerText);
		setIsLoading(true);
	};

	const [search, setSearch] = useState('');
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		const nowDate = new Date();
		async function getData() {
			/** if quickSearch is set to 'Today'
			 * filter through each snapshot and compare timestamps to find posts that were posted
			 * within 24 hrs
			 * 86400000 = 24 hrs in milliseconds
			 */
			if (quickSearch === 'Today') {
				await db.collection('feeds').onSnapshot((snapshot) => {
					snapshot.docs.forEach((doc) => {
						if (doc.data().timestamp) {
							const postDate = doc.data().timestamp.toDate().getTime();
							if (nowDate - postDate < 86400000) {
								setPosts((posts) => [
									...posts,
									{ id: doc.id, data: doc.data() },
								]);
							}
						}
					});
				});
			} else {
				await db
					.collection('feeds')
					.where('type', '==', quickSearch)
					.onSnapshot((snapshot) =>
						setPosts(
							snapshot.docs.map((doc) => ({
								id: doc.id,
								data: doc.data(),
							}))
						)
					);
			}
			setIsLoading(false);
		}

		getData();
	}, [quickSearch]);

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
	};

	/** Prompts Modal to edit Post information */
	const editPost = (id) => {
		console.log('editing..', id);
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	/** Quick Search Category List */
	const SearchCategoryList = SearchCategories.map((category, index) => (
		<ListItem
			key={category.toLowerCase()}
			button
			id={category.toLowerCase()}
			onClick={toggleQuickSearch}
			className={quickSearch === category ? 'active' : 'inactive'}>
			<ListItemText primary={category} />
		</ListItem>
	));

	return (
		<div className="Search">
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
				type="error"
			/>
			<div className="Search-Header">
				<Searchbar value={search} setValue={setSearch} />
				<div className="Search-Categories">
					<List>{SearchCategoryList}</List>
				</div>
			</div>
			<div className="Search__List">
				{posts.length > 0 ? (
					<FeedList posts={posts} remove={deletePostPrompt} edit={editPost} />
				) : (
					<NoData text={'posts'} />
				)}
			</div>
			<div
				className={`Search__Footer ${
					search.length === 0 ? 'disabled-btn' : ''
				}`}>
				<CTAButton text="Search" />
			</div>
		</div>
	);
}

export default Search;
