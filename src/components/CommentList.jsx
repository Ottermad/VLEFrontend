import React, { Component } from 'react';

class CommentList extends Component {
	render() {
		return (
			<div>
					<p><strong>Comments</strong></p>
						<ul>
							{
								this.props.comments.map((comment, index) => {
									console.log(comment)
									return (
										<li key={index}>{comment.text} by <em>{comment.user.first_name} {comment.user.last_name}</em></li>
									);
								})
							}
						</ul>
				</div>
		);
	}
}

export default CommentList;