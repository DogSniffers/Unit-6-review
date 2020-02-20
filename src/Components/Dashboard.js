import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import PostDisplay from "./PostDisplay";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      userInput: ""
    };
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    axios.get(`/api/posts/${this.props.user.user_id}`).then(res =>{this.setState({posts: res.data})}).catch(err => console.log(err))
    // Collecting the userID from redux, then setting state of the POSTS to the DATA based on user ID.
  };

  handleChange = e => {this.setState({userInput: e.target.value})};
// E.Target.value is PRETTY STANDARD for collecting user input
  submitNewPost = () => {
    axios.post(`/api/posts/${this.props.user.user_id}`, {
      post: this.state.userInput
    }).then(() => {
      this.getPosts()
      // We added to to show us the updated post list without a refresh or a three step axios request.
    }).catch(err => console.log(err))
    // We don't need to set a post ID as it will get set when the post is pushed to the DB functions, but we are setting a User id here to set the post to the user so it can be found later with GET posts
  };

  handleEdit = (post_id,text) => {
    // we need the post_id for the post to edit, and the text BODY to know wha tto edit
    axios.put(`/api/posts/${post_id}`,{text}).then(() =>{
      this.getPosts();
    }).catch(err => console.log(err))
  };

  handleDelete = post_id => {
    // Just needs the post_id because what is on the body of the object does not matter
    axios.delete(`/api/posts/${post_id}`).then(() => {
      this.getPosts();
    }).catch(err => console.log(err))
  };

  render() {
    const mappedPosts = this.state.posts.map((post, index) => {
      return (
        <PostDisplay
        key={index}
        handleEdit={this.handleEdit}
        // passing down this.handleEdit as handleEdit to the child component so that you can access the handleEdit and handleDelete on the POSTID pretty much
        handleDelete={this.handleDelete}
        post={post}
        />
      );
    });
    return (
      <>
        <div className="input-container">
          <textarea
            id="new-post"
            cols="60"
            rows="2"
            placeholder="New post..."
            value={this.state.userInput}
            // If you don't do this, it is much more difficult to clear the text box
            // This is also pretty standard, same with e.target.value as both are based on user input and are connected 
            onChange={e => {
              this.handleChange(e);
            }}
          />
          <button onClick={this.submitNewPost} className="input-container-button">
            Post
          </button>
        </div>

        <section className="app-body">
          <div className="padding"/>
          <ul className="flex-vertical-center post-feed">{mappedPosts}</ul>
        </section>
      </>
    );
  }
}

const mapStateToProps = reduxState => {
  const {user} = reduxState
  return {
    user
  };
};
// This is setting the reduxState to props, so that we can pass it down from here and use it here.
// Connecting allows us to get the reduxState
export default connect(mapStateToProps)(Dashboard);
