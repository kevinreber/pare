/** Dependencies */
import React, { useState, useEffect } from 'react';

/** Components & Helpers */
import NoData from '../components/general/NoData';
import CTAButton from '../components/general/CTAButton';
import Searchbar from '../components/general/Searchbar';
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
	const [quickSearch, setQuickSearch] = useState('Today');
	const toggleQuickSearch = (e) => {
		setPosts([]);
		setQuickSearch(e.target.innerText);
	};

	const [search, setSearch] = useState('');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const nowDate = new Date();

		/** if quickSearch is set to 'Today'
		 * filter through each snapshot and compare timestamps to find posts that were posted
		 * within 24 hrs
		 * 86400000 = 24 hrs in milliseconds
		 */
		if (quickSearch === 'Today') {
			db.collection('feeds').onSnapshot((snapshot) => {
				snapshot.docs.forEach((doc) => {
					if (nowDate - doc.data().timestamp.toDate().getTime() < 86400000) {
						setPosts((posts) => [...posts, { id: doc.id, data: doc.data() }]);
					}
				});
			});
		} else {
			db.collection('feeds')
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
	}, [quickSearch]);

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
			<div className="Search-Header">
				<Searchbar value={search} setValue={setSearch} />
				<div className="Search-Categories">
					<List>{SearchCategoryList}</List>
				</div>
			</div>
			<div className="Search__List">
				{posts.length > 0 ? (
					<FeedList posts={posts} />
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
