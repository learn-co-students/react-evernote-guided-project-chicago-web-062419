import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {
  constructor() {
    super()
    this.state = {
      notesArray: [],
      selected: null,
      editClicked: false,
      search: ""
    }
    this.selectNote = this.selectNote.bind(this)
    this.toggleEditClicked = this.toggleEditClicked.bind(this)
    this.handleNewNoteClick = this.handleNewNoteClick.bind(this)
    this.deleteNote= this.deleteNote.bind(this)

  }


  //CREATE
  addNote = (newNote) => {
    this.setState((prevState) => {
      return { notesArray: [...prevState.notesArray, newNote] }
    })
  }

  handleNewNoteClick(event) {
    event.preventDefault()
    fetch(`http://localhost:3000/api/v1/notes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: "New Note",
        body: "What's your note about?",
      })
    })
      .then(response => response.json())
      .then(note => { this.addNote(note) })
      .then(note => {this.updateNotesArray(note)})
    // 
  }

  //READ 
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/notes')
      .then(response => response.json())
      .then(notes => {
        this.setState({
          notesArray: notes
        })
      })
  }

  handleSearch = event => {
    this.setState({ search: event.target.value })
    // console.log(this.state.search)
  }

  filterNotes = () => {
    return this.state.notesArray.filter(
      note =>
        (note.title.toLowerCase().includes(this.state.search.toLowerCase())) ||
        (note.body.toLowerCase().includes(this.state.search.toLowerCase()))
    );
  }


  //UPDATE
  //Update the note array and change the content section back to the note viewer 

  updateNotesArray = (updatedNote) => {
    this.setState({
      //change this to prevState 
      notesArray: this.state.notesArray.map(note => {
        if (updatedNote.id === note.id) {
          return updatedNote
        } else {
          return note
        }
      })
    })
  }

  selectNote(note) {
    this.setState({
      selected: note,
      editClicked: !this.state.editClicked
    })

  }

  toggleEditClicked() {
    this.setState({
      editClicked: !this.state.editClicked
    })
  }

 //DELETE
  //Create a Delete Method via Fetch. (Backend)
  //Create a Function that updates the frontend. 
  goodbyeNote=()=>{
    let y = this.state.notesArray.filter(note => note.id != this.state.selected.id)
    this.setState({
      notesArray: y,
      selected: null 
    })
  }

  deleteNote(){
    let x = this.state.selected.id
    let y = this.state.notesArray.filter(note => note.id != this.state.selected.id)
    this.setState({
      notesArray: y,
      selected: null,
      editClicked: false
    })
    fetch(`http://localhost:3000/api/v1/notes/${x}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      
    })
  }
  
  render() {
    return (
      <Fragment>
        <Search
          handleSearch={this.handleSearch} />
        <div className='container'>
          <Sidebar
            notesArray={this.filterNotes()}
            selectNote={this.selectNote}
            addNote={this.addNote}
            handleNewNoteClick={this.handleNewNoteClick}

          />
          <Content
            selected={this.state.selected}
            editClicked={this.state.editClicked}
            toggleEditClicked={this.toggleEditClicked}
            handleChange={this.handleChange}
            updateNotesArray={this.updateNotesArray}
            deleteNote={this.deleteNote}
          />
        </div>
      </Fragment>
    );
  }

  }

export default NoteContainer;
