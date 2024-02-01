import React,{useState,useEffect} from 'react';
import '../../css/customstyle.css';
import { fetchService } from '../../services/fetchServices';

const PostDetails = ({post,fetchPostsCallback}) => {

    const [PostDetails,setPostDetails] = useState(null);

    useEffect(()=>{
        const fetchPostDetails = async() =>{
            if(post){
                try{
                    const postData = await fetchService.get(`posts/${post.id}`);
                    setPostDetails(postData);
                }catch(e){
                    console.error('Error fetching post details',e);
                }
            }
        };
        fetchPostDetails();
    },[post]);

    const handleDeletePost = async () =>{
        if(post){
            try{
                await fetchService.deletePost(`posts/${post.id}`);
                setPostDetails(null);
                fetchPostsCallback();
            }catch(e){
                console.error('Error deleting post: ',e);
            }
        }
    };


    return (
        <div className="container my-5 updateDetails-Container">
            { PostDetails ? (
                <div className="card updateDetails-Container UpdateDetails-Post">
                    
                    <div className="card-body " >
                        <h5 className="card-title">Title: {PostDetails.title}</h5>
                        <p className="card-text">Author: {PostDetails.author}</p>
                        <p className="card-text">{PostDetails.content}</p>
                        <div>
                            <button className="btn btn-primary edit-button">Edit</button> 
                            <button className="btn btn-danger" onClick={handleDeletePost}>Delete</button>
                        </div>
                    </div>
                </div>
            ):(
                null
            )}
        </div>
    );
}

export default PostDetails