import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {

  render() {
    return (
      <div className='master-detail-element sidebar'>
        <NoteList notesArray={this.props.notesArray} selectNote={this.props.selectNote} selected={this.props.selected} />
        <button onClick={this.props.handleNewNoteClick}>
          New
        </button>
      </div>
    );
  }
}


export default Sidebar;
