import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {

  const renderAllNotes = () =>{
    // console.log(props.notes)
    return props.notes.map(note =>{

      return <NoteItem note={note} key={note.id} setSelectedNote={props.setSelectedNote}/>
    })
  }

  return (
    <ul>
      {renderAllNotes()}
      {/* <NoteItem /> */}
    </ul>
  );
}

export default NoteList;
