import React from "react";

function PostDisplay({posts, deletePost}) {

  return (
    <div data-testid="posts-container" className="flex wrap gap-10">
      {posts.map((el) => (
      <div className="post-box" key={el.id}>
        <h3>{el.title}</h3>
        <p>{el.description}</p>
        <button onClick={() => deletePost(el.title)}>Delete</button>
      </div>
      ))}
    </div>
  );
}

export default PostDisplay;
