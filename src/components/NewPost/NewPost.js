import React, { useEffect, useState,useRef } from 'react';
import './NewPost.css';
import { fetchService } from '../../services/fetchServices';

const NewPost = ({isOpen,onClose,fetchPostsCallback}) => {
   const formRef = useRef(null);

    const [errorMessage, setErrorMessage] = useState('');

 
    const handleAddPost = async(e) =>{
        e.preventDefault();
        const title = formRef.current.elements.title.value;
        const author = formRef.current.elements.author.value;
        const content = formRef.current.elements.content.value;
        if(title!=='' && author!=='' && content!=='')
        {
            try{
                await fetchService.post(`posts`,{title,author,content});
                setErrorMessage('');
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
        console.log('isOPen:',isOpen);
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
                    <form className="form-group" ref={formRef}>
                        <div className='mb-3 row'>
                            <label className='col-sm-2 col-form-label'>Title</label>
                            <div className="col-sm-10">
                                 <input type="text" name ="title" />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label className='col-sm-2 col-form-label'>Author</label>
                            <div className="col-sm-10">
                                <input type="text" name="author" />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label className='col-sm-2 col-form-label'>Content</label>
                            <div className="col-sm-10">
                                <textarea type="textarea" name ="content"/>
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

