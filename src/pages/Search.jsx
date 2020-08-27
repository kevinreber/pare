import React, { useState } from 'react';
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
import FeedList from '../components/feed/FeedList';
import './styles/Search.css';

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

const SearchCategoryList = SearchCategories.map((category) => (
	<ListItem button>
		{/* <p>{category}</p> */}
		<ListItemText primary={category} />
	</ListItem>
));

function Search() {
	const classes = useStyles();

	const [search, setSearch] = useState('');
	const [posts, setPosts] = useState([]);

	return (
		<div className='Search'>
			<div className='Search-Header'>
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder='Search…'
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
					/>
					{/* <TextField
						id='outlined-search'
						label='Search field'
						type='search'
						variant='outlined'
					/> */}
				</div>
			</div>
			<div className='Search-Categories'>
				<List>{SearchCategoryList}</List>
			</div>
			<FeedList posts={posts} />
		</div>
	);
}

export default Search;
