import React, { useState } from 'react';
import '../../css/customstyle.css';


export const UpdateTitle = (props) => {
    const[newTitle,setNewTitle] = useState('');

    const handleOnChange=(e)=>{
        setNewTitle(e.target.value);
    }
    const handleOnChangeTitle= ()=>{
        props.setUpdatedPost(newTitle);
    }

  return (
    <div className="form-inline">
        <div className="form-group-row col-md-4 mb-3">
            <input type = "text" placeholder ="New Title" onChange={handleOnChange}/>
        </div>
        <div className="form-group-row col-md-4 mb-4">
            <button className="btn btn-primary" onClick={handleOnChangeTitle}>Change Title</button>
        </div>
    </div>
  )
}
