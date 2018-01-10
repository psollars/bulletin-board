import $ from "jquery-ajax";

export const getNotes = () => {
    $.get("/api/").done(function(notes) {
      console.log(notes);
      this.setState({notes});
    }.bind(this))
    .fail(function() {
      console.log("There was an error retrieving the notes.");
    });
  };

export const createNote = () => {
    alert("create note");
};

export const updateNote = () => {
    alert("update note");
};

export const deleteNote = () => {
    alert("delete note");
};
