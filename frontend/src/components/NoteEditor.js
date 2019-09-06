import React, { Component } from "react";

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      title: ""
    };
  }
  handleSubmit = event => {};

  handleChange = event => {
    this.setState({ [event.target.name]: [event.target.value] });
  };

  render() {
    console.log("I have rendered");
    return (
      <form className="note-editor" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={this.handleChange}
          value={this.props.currentNote.title}
        />
        <textarea
          name="body"
          onChange={this.handleChange}
          value={this.props.currentNote.body}
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
