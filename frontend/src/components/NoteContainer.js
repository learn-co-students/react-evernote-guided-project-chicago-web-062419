import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      currentNote: {},
      editingNote: false
    };
  }
  // this should save the state between the sidebar and the content panels

  getNotes = () => {
    fetch("http://localhost:3000/api/v1/notes")
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        this.setState({ notes: json });
      });
  };

  // PATCH fetch request for updating a note, takes in the ID
  saveEditedNote = changedNoteObj => {
    fetch("http://localhost:3000/api/v1/notes/" + this.state.currentNote.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        title: changedNoteObj.title,
        body: changedNoteObj.body
      })
    })
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        console.log(json);
        this.setState({
          currentNote: {
            ...this.state.currentNote,
            title: changedNoteObj.title,
            body: changedNoteObj.body
          },
          editingNote: false
        });
        this.getNotes();
      });
  };

  editNote = () => {
    this.setState({ editingNote: true });
  };

  stopEditNote = () => {
    this.setState({ editingNote: false });
  };

  // POST fetch request for creating a new note
  createNewNote = () => {
    fetch("http://localhost:3000/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: {
        title: this.currentNote.title,
        body: this.currentNote.body
      }
    })
      .then(resp => {
        return resp.json();
      })
      .then(() => {
        this.setState({ currentNote: {} });
        this.getNotes();
      });
  };

  componentDidMount() {
    this.getNotes(); // get notes when the component mounts
  }

  setSelectedNote = note => {
    this.setState({ currentNote: note }); // changes the displayed note in the Content
  };

  componentDidUpdate(prevState) {
    console.log("Note Container has updated");
    console.log(this.state.currentNote);
  }

  render() {
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar
            notes={this.state.notes}
            setSelectedNote={this.setSelectedNote}
          />
          <Content
            currentNote={this.state.currentNote}
            saveEditedNote={this.saveEditedNote}
            editingNote={this.state.editingNote}
            editNote={this.editNote}
            stopEditNote={this.stopEditNote}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
