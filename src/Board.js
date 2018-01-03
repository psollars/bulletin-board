import React, { Component } from 'react';
import getNotes from './Actions';
import Note from './Note';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        "go to grocery store",
        "shovel driveway",
        "play zelda",
        "listen to radiohead"
      ]
      
    };
  }

  render() {
    const notes = this.state.notes.map((note, i) => {
      return <Note key={i}>{note}</Note>;
    });

    return (
      <div className="board">
        {notes}
        <button onClick={getNotes}>getNotes</button>
      </div>
    );
  }



}

export default Board;