import React, { useEffect, useState } from 'react';
import './NewPost.css';
import { fetchService } from '../../services/fetchServices';

const NewPost = ({isOpen,onClose,fetchPostsCallback}) => {
   

    const [newPost,setNewPost] = useState({
            title: '',
            author: '',
            content: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleAddPost = async(e) =>{
        e.preventDefault();
        console.log(newPost);
        if(newPost.title!=='' && newPost.author!=='' && newPost.content!=='')
        {
            try{
                await fetchService.post(`posts`,newPost);
                setNewPost({
                    title: '',
                    author: '',
                    content: ''
                });
                onClose();
                fetchPostsCallback();
            }catch(error){
                console.error('Error saving post: ',error);
            }
        }
        else{
            setErrorMessage('Please fill in all fields.');
        }
        
    }

    useEffect(() => {
        if (isOpen) {
            setErrorMessage('');
        }
    }, [isOpen]);

    if(!isOpen) return null;

    return (
            <div className="modal ">
                <div className="modal-content">
                    <div className=' row'>
                        <div className='col-sm-5 '><h5>Add New Post</h5></div>
                        <div className='col-sm-7'><span className="close" onClick={onClose}>&times;</span></div>
                    </div>
                    
                    
                    <hr/>
                    <form className="form-group">
                        <div className='mb-3 row'>
                            <label className='col-sm-2 col-form-label'>Title</label>
                            <div className="col-sm-10">
                                 <input type="text" name ="title" value={newPost.title} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label className='col-sm-2 col-form-label'>Author</label>
                            <div className="col-sm-10">
                                <input type="text" name="author" value={newPost.author} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label className='col-sm-2 col-form-label'>Content</label>
                            <div className="col-sm-10">
                                <textarea type="textarea" name ="content" value={newPost.content} onChange={handleChange} />
                            </div>
                        </div>
                        <button type="submit"  className="btn btn-primary" onClick={handleAddPost}>Submit</button>
                    </form>
                    <div className='mb-3 row'  style={{color:'red'}}>{errorMessage}</div>
                </div>
            </div>
        );
    
  
}

export default NewPost

