import React from 'react';


// renders the individual note and truncates the body of the note to be only 20 characters. 
// event listener onClick pass the selected note as "props.note" to the handleSelectNote function in the NoteContainer
const NoteItem = (props) => (

  <li
  onClick={() => props.handleSelectNote(props.note)}>

    <h2>{props.note.title}</h2>
    <p>{props.note.body.substring(0, 20)}</p>
  </li>
);

export default NoteItem;
