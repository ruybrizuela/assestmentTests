import React from 'react'

const PostContext = React.createContext(null);

export function PostsProvider({children}){
  const [posts, setPosts] = React.useState([])
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")

  const handleTitleInput = (e)=>{
    setTitle(e.target.Input)
  }

  const handleDescriptionInput = (e)=>{
    setDescription(e.target.Input)
  }

  const addPost = () => {
    const newPost = {
      id: Date.now(),
      title,
      description
    }
    setPosts(prevPosts => [...prevPosts, newPost])
  }

  const deletePost = (id) => {
    const filtered = posts.filter(el => el.id !== id)
    setPosts(filtered)
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        deletePost,
        handleTitleInput,
        handleDescriptionInput,
        title,
        description
      }}
      >
        {children}
      </PostContext.Provider>
  )
}

export function usePosts() {
  const ctx = React.useContext(PostContext);
  if(!ctx) throw new Error("usePosts must be used inside <PostsProvider");
  return ctx;
}