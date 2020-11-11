/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import CommentCard from '../CommentCard/CommentCard';

/** Creates List of Comments
 * Feed -> FeedList -> PostCard -> CommentList -> CommentCard
 *
 * @param {string}		postId		ID of post.
 * @param {array} 		comments	Array of object of comment data.
 * @param {function}	remove		Function to remove comment.
 * @param {function}	edit		function to edit comment.
 *
 */
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

CommentsList.propTypes = {
	postId: PropTypes.string,
	comments: PropTypes.array,
	remove: PropTypes.func,
	edit: PropTypes.func,
};

export default CommentsList;
