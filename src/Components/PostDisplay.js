import React from "react";
import Post from "./Post";
import Edit from "./Edit";

class PostDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  toggleEdit = () => {
    this.setState({isEditing:!this.state.isEditing})
    // Sets state of isEditing to the reversal of current value
  }

  render() {
    const {post_id,text} = this.props.post;
    // These are on the POST object which is why they are getting destructured seperately
    const {handleEdit, handleDelete} = this.props
    return (
      <>
        {this.state.isEditing ? (
          <Edit
           id={post_id}
           text={text}
           toggleEdit={this.toggleEdit}
           handleEdit={handleEdit}
          />
        ) : (
          <Post
          id={post_id}
          text={text}
          toggleEdit={this.toggleEdit}
          handleDelete={handleDelete}
          />
        )}
      </>
    );
  }
}

export default PostDisplay;
