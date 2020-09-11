/** Dependencies */
import React, { useState, useEffect } from 'react';

/** Components & Helpers */
import NoData from '../components/general/NoData';
import db from '../config/fbConfig';
import './styles/Search.css';

/** MUI */
import {
	fade,
	makeStyles,
	InputBase,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import FeedList from '../components/Feed/FeedList';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		// borderRadius: theme.shape.borderRadius,
		// backgroundColor: fade(theme.palette.common.white, 0.15),
		// '&:hover': {
		// 	backgroundColor: fade(theme.palette.common.white, 0.25),
		// },
		// marginRight: theme.spacing(2),
		// marginLeft: 0,
		// width: '100%',
		// [theme.breakpoints.up('sm')]: {
		// 	marginLeft: theme.spacing(3),
		// 	width: 'auto',
		// },
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

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
			className={`${index === SearchCategories.length - 1 ? 'mr' : ''}
			${quickSearch === category.toLowerCase() ? 'active' : 'inactive'}`}>
			<ListItemText primary={category} />
		</ListItem>
	));

	return (
		<div className='Search'>
			<div className='Body-Header Search-Header'>
				<div className='Search__Elements'>
					<div className='Search__Icon'>
						<SearchIcon />
					</div>
					<input
						id='search'
						className='form-control mate-form-input'
						type='search'
						onChange={(e) => setSearch(e.target.value)}
						name='search'
						value={search}
						maxLength='30'
						placeholder='Search...'
					/>
				</div>
			</div>
			<div className='Search-Categories'>
				<List>{SearchCategoryList}</List>
			</div>
			{posts ? <FeedList posts={posts} /> : <NoData text={'posts'} />}
		</div>
	);
}

export default Search;
