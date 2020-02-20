import React from "react";

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postInput:props.text
      // edit needs state because we need a text field
    };
  }

  handleCancel = () => {
    this.setState({ postInput:this.props.text})
    this.props.toggleEdit();
  };

  handleChange = e => {
    this.setState({postInput: e.target.value})
  };

  render() {
    return (
      <li className="post-container">
        <div>
          <input
            className="post-text"
            value={this.state.postInput}
            onChange={this.handleChange}
          />
        </div>
        <div className="post-buttons">
            <button
              className="input-container-button-small"
              onClick={() => { 
                this.handleCancel()
              }}
            >
              Cancel
            </button>
            <button
              className="input-container-button-small"
              onClick={() => {
                this.props.handleEdit(this.props.id, this.state.postInput);
                // If you ONLY use props in a function/setting a function it is probably easier to use the needed function somewhere else so that you do not need to pass down so many components through props. But in this example, we are also using state so this is OK
                this.props.toggleEdit();
              }}
            >
              Save
            </button>
        </div>
      </li>
    );
  }
}

export default Edit;
