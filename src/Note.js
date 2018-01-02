import React, { Component } from 'react';

class Note extends Component {
  render() {
    return (
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
    alert("yo");
  };

  handleRemove = () => {
    alert("yoremove");
  };

}

export default Note;
