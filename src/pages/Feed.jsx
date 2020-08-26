import React, { useState, useEffect } from 'react';
import FeedList from '../components/feed/FeedList';
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
			<FeedList posts={posts} />
		</div>
	);
}

export default Feed;
