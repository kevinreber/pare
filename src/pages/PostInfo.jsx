import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function PostInfo() {
	const { postId } = useParams();

	const [post, setPost] = useState(null);

	return (
		<div>
			<h5>This is a Post</h5>
		</div>
	);
}

export default PostInfo;
