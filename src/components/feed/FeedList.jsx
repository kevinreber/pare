import React from 'react';
import PostCard from './PostCard';

function feedList({ posts }) {
	const List = posts.map((post) => (
		<PostCard
			id={post.data.id}
			key={post.data.id}
			title={post.data.title}
			username='Tony'
			user_id={1}
			avatar={'https://randomuser.me/api/portraits/thumb/women/75.jpg'}
			content={post.data.content}
			location={post.data.location}
			comments={[]}
			timestamp={post.data.created_at}
			isBookmarked={false}
		/>
	));

	return <div>{List}</div>;
}

export default feedList;
