import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  console.log(props.notes)
  const mappedNotes = props.notes.map(note => <NoteItem key={note.id} note={note} handleSelectNote={props.handleSelectNote} />)

  return (
    <ul>
      {mappedNotes}
    </ul>
  );
}

export default NoteList;
