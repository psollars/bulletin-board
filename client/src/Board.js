import React, { Component } from 'react';
import {getNotes} from './Actions';
import Note from './Note';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [] 
    };
  }

  componentDidMount() {
    getNotes();
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={() => this.addNote('New Note')}>+</button>
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

  nextId = () => {
      this.uniqueId = this.uniqueId || 0
      return this.uniqueId++
  };
  
  addNote = (text) => {
      var notes = [
          ...this.state.notes,
          {
              id: this.nextId(),
              text: text
          }
      ]
      this.setState({notes})
  }

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