import React from 'react';
import '../../css/customstyle.css';


const PostDetails = ({post}) => {

    if(!post ){
        return <div></div>;
    }

    return (
        <div className="container my-5 updateDetails-Container">
        <div className="card updateDetails-Container UpdateDetails-Post">
            
            <div className="card-body " >
            <h5 className="card-title">Title: {post.title}</h5>
            <p className="card-text">Author: {post.author}</p>
            <p className="card-text">{post.content}</p>
            <div>
                <button className="btn btn-primary edit-button">Edit</button> 
                <button className="btn btn-danger">Delete</button>
            </div>
            </div>
        </div>
        </div>
    );
}

export default PostDetails