import React, { Component } from 'react';

class Note extends Component {
  render() {
    return (
      <div className="note">
        <p></p>
        <span>
          <button>EDIT</button>
          <button>REMOVE</button>
        </span>
      </div>
    );
  }
}

export default Note;
