import $ from "jquery-ajax";

export function getNotes() {
    // return function() {
        $.get("/api/").done(function(data) {
            console.log(data);
            //in Board.js this.setState({data});
        });
    // };
}

export const createNote = () => {
    alert("create note");
};

export const updateNote = () => {
    alert("update note");
};

export const deleteNote = () => {
    alert("delete note");
};
