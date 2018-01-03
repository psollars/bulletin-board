import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }


  render() {
    return (
      (this.state.editing) ? 
      <div className="note">
        <textarea ref="newText">{this.props.children}</textarea>
        <button onClick={this.handleSave}>SAVE</button>
      </div>
      : 
      <div className="note">
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.handleEdit}>EDIT</button>
          <button onClick={this.handleRemove}>REMOVE</button>
        </span>
      </div>
    );
  }

  handleEdit = () => {
    this.setState({editing: true})
  };

  handleSave = () => {
    this.props.saveNote(this.refs.newText.value, this.props.id)
    this.setState({editing: false})
  };

  handleRemove = () => {
    this.props.removeNote(this.props.id)
  };

}

export default Note;
