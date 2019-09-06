import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      currentNote: {}
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
    console.log("===Patching Note===");
    console.log(changedNoteObj);
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
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          //this should update selected Note without clearing out the currentNote obj
          console.log("updated");
          console.log(json);
        })
    });
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
        // this should set the state, causing a rerender
        // the following re-render should cause the new article to appear
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
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
