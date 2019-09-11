import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  const mappedNotes = props.notes.map((note => {
      return <NoteItem key={note.id} note={note} showNote={props.showNote}/>
  }))
  return (
    <ul>
      {mappedNotes}
    </ul>
  );
}

export default NoteList;
