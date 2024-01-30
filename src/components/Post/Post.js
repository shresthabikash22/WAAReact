import React from 'react';
import '../../css/customstyle.css';
const  Post =(props) =>{

  const handleOnClick=()=>{
    props.setSelected(props)
  }

    return(
      <div className='my-5 ' >
        <div className=" bg-primary post-container" onClick={handleOnClick}>
          <div>Id: {props.id}</div>
          <div>Title: {props.title}</div>
          <div className='Field'>Author: {props.author}</div>
        </div>
      </div>
    );

  }

export default Post;

