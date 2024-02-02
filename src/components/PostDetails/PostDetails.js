import React,{useState,useEffect,useContext} from 'react';
import '../../css/customstyle.css';
import { fetchService } from '../../services/fetchServices';
import {PostContext} from '../../context/PostIdContext';
import Comment from '../Comment/Comment';

const PostDetails = ({fetchPostsCallback}) => {
    const id = useContext(PostContext);

    const [PostDetails,setPostDetails] = useState(null);

    useEffect(()=>{
        const fetchPostDetails = async() =>{
            if(id){
                try{
                    const postData = await fetchService.get(`posts/${id}`);
                    
                    setPostDetails(postData);
                }catch(e){
                    console.error('Error fetching post details',e);
                }
            }
        };
        fetchPostDetails();
    },[id]);

    const handleDeletePost = async () =>{
        if(id){
            try{
                await fetchService.deletePost(`posts/${id}`);
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
                    
                        {
                            PostDetails.comments  && PostDetails.comments.length > 0 ?
                           (
                            <div className="card w-95" style={{textAlign:'left'}}>
                                <div className='card-header'><h4>Comments</h4></div>
                                <ul className="list-group list-group-flush" style={{paddingLeft:'5em'}}>
                                    {PostDetails.comments.map((comment) => (
                                        
                                        <li className="card-text" key={comment.id} >
                                            <Comment comment={comment} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                           
                           ):( <p>No comments </p>)
                        }
                    <br/>
                </div>
            ):(
                ' '
            )}
        </div>
    );
}

export default PostDetails