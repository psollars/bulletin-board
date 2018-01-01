import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Note extends Component {
  render() {
    return (
      <div className="Note">
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
