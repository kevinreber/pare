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
	const [quickSearch, setQuickSearch] = useState('today');
	const toggleQuickSearch = (e) => {
		setQuickSearch(e.target.innerText.toLowerCase());
	};

	const [search, setSearch] = useState('');
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		console.log(quickSearch);
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
	}, [quickSearch]);

	/** Quick Search Category List */
	const SearchCategoryList = SearchCategories.map((category, index) => (
		<ListItem
			button
			id={category.toLowerCase()}
			onClick={toggleQuickSearch}
			className={
				quickSearch === category.toLowerCase() ? 'active' : 'inactive'
			}>
			<ListItemText primary={category} />
		</ListItem>
	));

	return (
		<div className='Search'>
			<div className='Search-Header'>
				<Searchbar value={search} setValue={setSearch} />
				<div className='Search-Categories'>
					<List>{SearchCategoryList}</List>
				</div>
			</div>
			<div className='Search__List'>
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
				<CTAButton text='Search' />
			</div>
		</div>
	);
}

export default Search;
