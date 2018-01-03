import React, { Component } from 'react';
import getNotes from './Actions';
import Note from './Note';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {id: 0, text: "go to grocery store"},
        {id: 1, text: "shovel driveway"},
        {id: 2, text: "play zelda"},
        {id: 3, text: "listen to radiohead"}
      ] 
    };
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={getNotes}>getNotes</button>
      </div>
    );
  }

  eachNote = (note) => {
    return (<Note key={note.id}
                  id={note.id}
                  saveNote={this.saveNote}
                  removeNote={this.removeNote}>
              {note.text}
            </Note>);
  };

  saveNote = (newText, id) => {
    const notes = this.state.notes.map(
        note => (note.id !== id) ?
           note : 
            {
                ...note, 
                text: newText
            }
        )
    this.setState({notes})
  };

  removeNote = (id) => {
    const notes = this.state.notes.filter(note => note.id !== id)
    this.setState({notes})
  }

}

export default Board;