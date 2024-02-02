import React from 'react';

const Comment = React.memo(({ comment }) => {
  return (
        <p key={comment.id} >{comment.name}</p>
  );
});

export default Comment;