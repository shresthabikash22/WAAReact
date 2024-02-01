import React from 'react';
import Post from '../../components/Post/Post';
import '../../css/customstyle.css';

function Posts(props) {

  return (
    <div className="container my-5">
        <div className='row '>
           { props.posts.map(post=>{
                 return  <div className="col" >
                 <Post
                 title = {post.title}
                 author = {post.author}
                 content = {post.content}
                 id = {post.id}
                 key = {post.id}
                 setSelected={ props.setSelected}
             />
             </div>
            })}
        </div>
    </div>
  ) ;
}

export default Posts;