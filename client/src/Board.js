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
        <div className="add-note fa fa-plus" onClick={() => this.addNote("New Note")}></div>
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

  getNotes = () => {
    $.get("/api/").done(function(notes) {
      console.log(notes);
      this.setState({notes});
    }.bind(this))
    .fail(function() {
      console.log("There was an error retrieving the notes.");
    });
  };
  
  addNote = (note) => {
    $.ajax({
      url: "/api/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({"text" : note })
    }).done(function() {
      this.getNotes();
    }.bind(this))
    .fail(function() {
      console.log("There was an error adding the note.");
    });
  };

  saveNote = (newText, id) => {
    $.ajax({
      url: "/api/" + encodeURIComponent(id),
      method: "PUT",
      contentType: "application/json",
      data: JSON.stringify({"text" : newText })
    }).done(function() {
      this.getNotes();
    }.bind(this))
    .fail(function() {
      console.log("There was an error updating the note.");
    });;
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

} // end of component

export default Board;
