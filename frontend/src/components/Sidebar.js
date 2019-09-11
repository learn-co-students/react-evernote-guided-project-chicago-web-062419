import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {

  filterNotes = () => {
    const searchTerm = this.props.searchTerm
    const notesCollection = this.props.notes
    const filteredNotes = notesCollection.filter(note => 
      note.title.toLowerCase().includes(searchTerm) || note.body.toLowerCase().includes(searchTerm))
    return filteredNotes
  }

  render() {
    return (
      <div className='master-detail-element sidebar'>
        <NoteList notes={this.filterNotes()} showNote={this.props.showNote}/>
        <button onClick={this.props.createNewNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;
