import React, { Component } from "react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: {
        title: this.props.currentNote.title,
        body: this.props.currentNote.body
      }
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  handleChange = event => {
    this.setState({
      currentNote: { [event.target.name]: [event.target.value] }
    });
  };

  render() {
    console.log("I have rendered");
    return (
      <form className="note-editor" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={this.state.currentNote.title}
        />
        <textarea
          name="body"
          onChange={this.handleChange}
          value={this.state.currentNote.body}
        />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
