import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      noteData: [],
      selectedNote: null,
      editedNote: null,
      searchTerm: ''
    }
  }

  showNote = (note) => {
    this.setState({
      selectedNote: note,
      editedNote: null
    })
  }

  selectNoteToEdit = (note) => {
    this.setState({
      selectedNote: null,
      editedNote: note
    })
  }

  updateNote = (note) => {
    fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
      method: 'PATCH',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json())
    .then(data => {
      this.setState(prevState => {
        return {noteData: prevState.noteData.map(n => {
         return n.id === data.id ? data : n
        })}
      }, ()=> this.showNote(data))
    })
  }

  showNewNote = (note) => {
    fetch(`http://localhost:3000/api/v1/notes/${note.id}`)
      .then(resp => resp.json())
      .then(newNoteData => this.setState(newNoteData))
  }
  
  createNewNote = (note) => {
    fetch(`http://localhost:3000/api/v1/notes/`, {
      method: 'POST',
      body: JSON.stringify({
        title: "Put title here",
        body: "Put body here"
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(newNoteData => this.setState((prevState)=> {
      return {noteData: [...prevState.noteData, newNoteData]}
    }))
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value.toLowerCase()});
  }

  deleteNote = (note) => {
    fetch(`http://localhost:3000/api/v1/notes/${note.id}`, {
      method: 'DELETE',
      })
      .then(()=> {
        const updatedNoteData = this.state.noteData.filter(note => note.id !== this.state.selectedNote.id)
        this.setState({
          selectedNote: null,
          noteData: updatedNoteData
        })
      })
    }

  render() {
    return (
      <Fragment>
        <Search handleChange={this.handleChange}/>
        <div className='container'>
          <Sidebar 
            searchTerm={this.state.searchTerm} 
            notes={this.state.noteData} 
            showNote={this.showNote} 
            createNewNote={this.createNewNote}/>
          <Content selectedNote={this.state.selectedNote} 
            editedNote={this.state.editedNote} 
            selectNoteToEdit={this.selectNoteToEdit}
            updateNote={this.updateNote} 
            showNewNote={this.showNewNote} 
            showNote={this.showNote}
            deleteNote={this.deleteNote}/>
        </div>
      </Fragment>
    );
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/notes')
      .then(resp => resp.json())
      .then(noteData => this.setState({noteData}))
      .catch(error => console.log(error))
  }
}

export default NoteContainer;
