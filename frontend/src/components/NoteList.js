import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  return (
    <ul>
      {props.notesArray.map(note =>
        <NoteItem key={note.id} note={note} selectNote={props.selectNote} filterNotes={props.filterNotes} />)}
    </ul>
  );
}

export default NoteList;
