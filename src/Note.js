import React, { Component } from 'react';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }


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
    this.setState({editing: true})
  };

  handleSave = () => {
    alert("yosave");
    this.setState({editing: false})
  };

  handleRemove = () => {
    alert("yoremove");
  };

}

export default Note;
