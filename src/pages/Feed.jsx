import React, { useState, useEffect } from 'react';
import FeedList from '../components/feed/FeedList';
import NoData from '../components/general/NoData';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import db from '../config/fbConfig';
import './styles/Feed.css';

function Feed() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection('feeds').onSnapshot((snapshot) =>
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	return (
		<div className='Feed'>
			<div className='Feed__List'>
				{posts ? <FeedList posts={posts} /> : <NoData text='posts' />}
			</div>
			<Fab aria-label='add'>
				<AddIcon />
			</Fab>
		</div>
	);
}

export default Feed;
