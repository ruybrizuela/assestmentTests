import React from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";

function Home() {
  const [posts, setPosts] = React.useState([])
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  const handleTitleInput = (e)=>{
    setTitle(e.target.value)
  }

  const handleDescriptionInput = (e)=>{
    setDescription(e.target.value)
  }

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      title,
      description
    }
    setPosts([...posts, newPost])
    setTitle('');
    setDescription('');
    console.log(posts)
  }

  const deletePost = (title) => {
    const filtered = posts.filter(el => el.title !== title)
    setPosts(filtered)
  }

  return (
      <div className="text-center ma-20">
        <div className="mb-20">
          <Input 
            handleTitleInput={handleTitleInput}
            handleDescriptionInput={handleDescriptionInput}
            title={title}
            description={description}
          />
          <button data-testid="create-button" className="mt-10" onClick={addPost} disabled={!title || !description}>
            Create Post
          </button>
        </div>
        <div className="posts-section">
          <PostDisplay 
            posts={posts}
            deletePost={deletePost}
          />
        </div>
      </div>
  );
}

export default Home;
