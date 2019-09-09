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
      editingNote: false ,
      user:{  // this can be used later when logging in is a thing
        id: 1 ,
        name: 'flatironschool'
      },
      searchQuery: ''

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
      .then(() => {
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

  // POST fetch request for creating a new note
  createNewNote = () => {
    const freshNote = {
      title: "Titulo Maximus",
      body: "Click -Edit- to add some LIFE to this poor, sorry note",
      user: this.state.user
    };
    fetch("http://localhost:3000/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(freshNote)
    })
      .then(resp => {
        return resp.json();
      })
      .then(() => {
        this.setState({ currentNote: freshNote }); // doing this will view the newly created note
        this.getNotes();
      });
  };

  deleteNote = () => {
    console.log("Deleting Note");
    fetch("http://localhost:3000/api/v1/notes/" + this.state.currentNote.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application.json",
        Accept: "application.json"
      }
    })
      .then(resp => {
        console.log("Deleting note");
        return resp.json();
      })
      .then(() => {
        this.setState({ currentNote: {} });
        this.getNotes();
      });
  };

  handleSearchQuery = (myQuery) =>{
    this.setState({searchQuery: myQuery})
    // do filtering here
  }

  editNote = () => {
    this.setState({ editingNote: true });
  };

  stopEditNote = () => {
    this.setState({ editingNote: false });
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
        <Search handleSearchQuery={this.handleSearchQuery}/>
        <div className="container">
          <Sidebar
            notes={this.state.notes}
            setSelectedNote={this.setSelectedNote}
            stopEditNote={this.stopEditNote}
            editingNote={this.state.editingNote}
            createNewNote={this.createNewNote}
          />
          <Content
            currentNote={this.state.currentNote}
            saveEditedNote={this.saveEditedNote}
            editingNote={this.state.editingNote}
            editNote={this.editNote}
            stopEditNote={this.stopEditNote}
            deleteNote={this.deleteNote}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
