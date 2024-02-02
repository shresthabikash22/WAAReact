import React, { useEffect, useState,useContext } from 'react';
import Posts from '../Posts/Posts';
import PostDetails from '../../components/PostDetails/PostDetails';
import { UpdateTitle } from '../UpdateTitle/UpdateTitle';
import { fetchService } from '../../services/fetchServices';
import NewPost from '../../components/NewPost/NewPost';
import {PostContext} from '../../context/PostIdContext';

function Dashboard() {
  const [flag, setFlag] = useState(true);

  const [selectedPost, setSelectedPost] = useState(null);

  // const [posts, setPosts] = useState([
  //   { id: 111, title: "Happiness", author: "John", content: "Happiness is an electrifying and elusive state.Every person has unique life experiences, and therefore unique experiences of happiness. " },
  //   { id: 112, title: "MIU", author: "Dean", content: "A non-profit university with on-campus and online degree programs" },
  //   { id: 113, title: "Enjoy Life", author: "Jasmine", content: "I work way too much, I need a break \n Just to enjoy this life \n I cannot sit around and wait \n And watch it pass me by so \n Hop in my two-seater \n Mamacita \n Lemme show you a good time \n Put the top down and blast the speakers" },
  // ]);

  const [posts, setPosts] = useState([]);

  const [isAddFormOpen,setIsAddFormOpen] = useState(false);

  const openAddPostForm = () =>{
    if(!isAddFormOpen){
      setIsAddFormOpen(true);
    }
  }

  const closeAddForm = () =>{
    if(isAddFormOpen){
      setIsAddFormOpen(false);
    }
  }


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

  const fetchPosts = async () => {
    setPosts(await fetchService.get("posts"));
  }

  const fetchPostsCallback = async () =>{
    await fetchPosts();
  }

  useEffect(() => {
      fetchPosts();
  }, [])

  
  return (
    <div className='container my-5'>
      <div>
          <button onClick={openAddPostForm} className='btn btn-primary'>Add Post</button>
          
      </div>
      <Posts posts={posts} setSelected={setSelected} />
      {posts!=null && posts.length>0 &&    <UpdateTitle setUpdatedPost={handleUpdatedPost} />}
       {
          selectedPost!=null &&  
          <PostContext.Provider value = {selectedPost.id}>
              <PostDetails post={selectedPost} fetchPostsCallback={fetchPostsCallback}  />
          </PostContext.Provider>
      }
      <NewPost isOpen={isAddFormOpen} onClose={closeAddForm} fetchPostsCallback={fetchPostsCallback}/>
    </div>
  );
}

export default Dashboard;
