import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  componentWillMount() {
    this.style = {
      right: this.randomPlacement(0, window.innerWidth - 150, "px"),
      top: this.randomPlacement(0, window.innerHeight - 150, "px"),
    }
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.refs.newText.focus();
      this.refs.newText.select();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.children !== nextProps.children || this.state !== nextState
  }

  render() {
    return (
      (this.state.editing) ? 
      <Draggable>
        <div className="note"
             style={this.style}>
          <textarea ref="newText" defaultValue={this.props.children}></textarea>
          <div className="save-note fa fa-floppy-o" onClick={this.handleSave}></div>
        </div>
      </Draggable>
      : 
      <Draggable>
        <div className="note"
             style={this.style}>
          <div className="remove-note fa fa-times" onClick={this.handleRemove}></div>
          <p>{this.props.children}</p>
          <div className="edit-note fa fa-pencil" onClick={this.handleEdit}></div>
        </div>
      </Draggable>
    );
  }

  randomPlacement = (x, y, units) => {
    return (x + Math.ceil(Math.random() * (y-x))) + units;
  };

  handleEdit = () => {
    this.setState({editing: true})
  };

  handleSave = () => {
    this.props.saveNote(this.refs.newText.value, this.props.id)
    this.setState({editing: false})
  };

  handleRemove = () => {
    this.props.removeNote(this.props.id)
  };

}

export default Note;
