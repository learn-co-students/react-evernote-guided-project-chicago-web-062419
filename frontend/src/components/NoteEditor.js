import React, { Component } from "react";

class NoteEditor extends Component {
  render() {
    console.log("I have rendered");
    return (
      <form className="note-editor">
        <input type="text" name="title" />
        <textarea name="body" />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
