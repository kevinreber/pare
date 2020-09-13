/** Dependencies */
import React from 'react';

/** Components & Helpers */
import CommentCard from './CommentCard';

function CommentsList({ postId, comments, remove, edit }) {
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
			remove={remove}
			edit={edit}
		/>
	));

	return <>{List}</>;
}

export default CommentsList;
