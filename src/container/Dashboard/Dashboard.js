import React, { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';
import PostDetails from '../PostDetails/PostDetails';
import { UpdateTitle } from '../UpdateTitle/UpdateTitle';

function Dashboard() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    { id: 111, title: "Happiness", author: "John", content: "Happiness is an electrifying and elusive state.Every person has unique life experiences, and therefore unique experiences of happiness. " },
    { id: 112, title: "MIU", author: "Dean", content: "A non-profit university with on-campus and online degree programs" },
    { id: 113, title: "Enjoy Life", author: "Jasmine", content: "I work way too much, I need a break \n Just to enjoy this life \n I cannot sit around and wait \n And watch it pass me by so \n Hop in my two-seater \n Mamacita \n Lemme show you a good time \n Put the top down and blast the speakers" },
  ]);

  const setSelected = (post) => {
    setSelectedPost(post);
  };

  const handleUpdatedPost = (newTitle) => {
    if (selectedPost) {
      const updatedPosts = posts.map(post =>
        post.id === selectedPost.id ? { ...post, title: newTitle } : post
      );
      setPosts(updatedPosts);
      setSelectedPost({ ...selectedPost, title: newTitle });
    }
  };

  return (
    <div className='container my-5'>
      <Posts posts={posts} setSelected={setSelected} />
      <UpdateTitle setUpdatedPost={handleUpdatedPost} />
      <PostDetails post={selectedPost} />
    </div>
  );
}

export default Dashboard;
