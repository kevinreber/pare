/** Dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/** Components & Helpers */
import NoData from '../components/general/NoData';
import CTAButton from '../components/general/CTAButton';
import Searchbar from '../components/general/SearchBar/Searchbar';
import ConfirmDialog from '../components/general/ConfirmDialog';
import Loader from '../components/layout/Loader/Loader';
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
		setIsLoading(true);
		setPosts([]);
		setQuickSearch(e.target.innerText);
	};

	const [search, setSearch] = useState('');
	const [startSearch, setStartSearch] = useState(false);

	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subtitle: '',
	});

	useEffect(() => {
		const nowDate = new Date();
		function getData() {
			/** if quickSearch is set to 'Today'
			 * filter through each snapshot and compare timestamps to find posts that were posted
			 * within 24 hrs
			 * 86400000 = 24 hrs in milliseconds
			 */
			if (quickSearch === 'Today') {
				db.collection('feeds')
					.get()
					.then((data) => {
						data.docs.forEach((doc) => {
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
					})
					.catch((err) => console.log(err));
			} else {
				db.collection('feeds')
					.where('type', '==', quickSearch)
					.get()
					.then((data) => {
						setPosts(
							data.docs.map((doc) => ({
								id: doc.id,
								data: doc.data(),
							}))
						);
					})
					.catch((err) => console.log(err));
			}
			setIsLoading(false);
		}
		if (isLoading && !startSearch) {
			getData();
		}
	}, [quickSearch, isLoading, startSearch]);

	useEffect(() => {
		// if user uses search bar, filter out posts that match search keywords
		const searchForPosts = () => {
			db.collection('feeds')
				.get()
				.then((data) => {
					data.docs.forEach((doc) => {
						if (doc.data().description.includes(search)) {
							setPosts((posts) => [...posts, { id: doc.id, data: doc.data() }]);
						}
					});
				})
				.catch((err) => console.log(err));

			setIsLoading(false);
			setStartSearch(false);
		};

		if (isLoading && startSearch) {
			searchForPosts();
		}
	}, [isLoading, startSearch, search]);

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

	const handleSubmit = () => {
		setPosts([]);
		setQuickSearch('');
		setIsLoading(true);
		setStartSearch(true);
	};

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

	const SearchBody =
		posts.length === 0 && !isLoading ? (
			<NoData text={'posts'} />
		) : (
			<FeedList posts={posts} remove={deletePostPrompt} edit={editPost} />
		);

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
				{isLoading && posts.length === 0 ? <Loader /> : SearchBody}
			</div>
			<div
				onClick={handleSubmit}
				className={`Search__Footer ${
					search.length === 0 ? 'disabled-btn' : ''
				}`}>
				<CTAButton text="Search" />
			</div>
		</div>
	);
}

export default Search;
