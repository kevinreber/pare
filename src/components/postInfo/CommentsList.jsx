import React from 'react';
import CommentCard from './CommentCard';

function CommentsList({ postId, comments }) {
	const List = comments.map((comment) => (
		<CommentCard
			postId={postId}
			id={comment.id}
			key={comment.id}
			message={comment.data.message}
			userId={comment.data.userId}
			username={comment.data.username}
			avatar={comment.data.avatar}
			timestamp={comment.data.timestamp}
		/>
	));

	return <>{List}</>;
}

export default CommentsList;
