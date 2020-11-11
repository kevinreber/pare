/** Dependencies */
import React from 'react';
import { PropTypes } from 'prop-types';

/** Components & Helpers */
import PostCard from '../PostCard/PostCard';

/** FeedList of Posts.
 *  Feed -> FeedList -> PostCard
 *
 * @param {array} 		posts	Array of objects containing data for each post.
 * @param {function} 	remove	Function to remove post. User will only see if they made post.
 * @param {function} 	edit	Function to edit post. User will only see if they made post.
 */
function FeedList({ posts, remove, edit }) {
	const List = posts.map((post) => (
		<PostCard
			id={post.id}
			key={post.id}
			title={post.data.title}
			username={post.data.username}
			userId={post.data.userId}
			avatar={post.data.avatar}
			description={post.data.description}
			location={post.data.location}
			type={post.data.type}
			start={post.data.start}
			end={post.data.end}
			attachment_preview={post.data.attachment_preview}
			attachment={post.data.attachment}
			attachment_name={post.data.attachment_name}
			timestamp={post.data.timestamp}
			last_updated={post.data.last_updated}
			comments={post.data.num_of_comments}
			isBookmarked={false}
			remove={remove}
			edit={edit}
		/>
	));

	return <>{List}</>;
}

FeedList.propTypes = {
	posts: PropTypes.array,
	remove: PropTypes.func,
	edit: PropTypes.func,
};

export default FeedList;
