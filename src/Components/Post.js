import React from "react";

const Post = props => {
  return (
    <li className="post-container">
      <div>
        <p className="post-text">{
        props.text
      }</p>
      </div>
      <div className="post-buttons">
        <button
          className="input-container-button-small"
          onClick={() =>{
            props.toggleEdit()
          }}
        >
          Edit
        </button>
        <button
          className="input-container-button-small"
          onClick={()=>{
            props.handleDelete(props.id)
            // Needed to do an arrow function here because we wanted to envoke handleDelete with something thats not element
          }
          }
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Post;
