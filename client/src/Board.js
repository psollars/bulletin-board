import React, { Component } from 'react';
//import {getNotes} from './Actions';
import Note from './Note';
import $ from "jquery-ajax";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [] 
    };
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <div className="add-note fa fa-plus" onClick={() => this.addNote({"text" : "New Note"})}></div>
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
  
  addNote = (note) => {
    $.ajax({
        url: "/api/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(note)
    }).done(function() {
        this.getNotes();
    }.bind(this))
    .fail(function() {
      console.log("There was an error adding the note.");
    });
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
    $.ajax({
        url: "/api/" + encodeURIComponent(id),
        method: "DELETE"
    }).done(function() {
      this.getNotes();
    }.bind(this))
    .fail(function() {
      console.log("There was an error removing the note.");
    });
  };

  getNotes = () => {
    $.get("/api/").done(function(notes) {
      console.log(notes);
      this.setState({notes});
    }.bind(this))
    .fail(function() {
      console.log("There was an error retrieving the notes.");
    });
  };

} // end of component

export default Board;
