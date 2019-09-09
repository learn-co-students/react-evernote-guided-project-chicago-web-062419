import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: null
    };
  }

  // Fetching Notes from the database & setting the original state to the array of note objects
  fetchNotes() {
    const notesURL = "http://localhost:3000/api/v1/notes";
    fetch(notesURL)
      .then(resp => resp.json())
      .then(notes => this.setState({ notes }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.fetchNotes();
  }


  // method to select one note so that it can display an individual note in the content component
  handleSelectNote = (note) => {
    this.setState({
      selectedNote: note
    })
  }
  // componentDidUpdate() {
  //   console.log(this.state);
  // }

  // passing props to the Sidebar component
  render() {
    return (
      <Fragment>
        <Search />
        <div className="container">
          <Sidebar notes={this.state.notes} 
          selectNote={this.handleSelectNote} />
          <Content 
          state={this.state}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
