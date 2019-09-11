import React, { Fragment } from 'react';

const NoteViewer = (props) => {
  return (
    <Fragment>
      <h2>{props.selectedNote.title}</h2>
      <p>{props.selectedNote.body}</p>
      <button onClick={()=> props.selectNoteToEdit(props.selectedNote)}>Edit</button>
      {/* check method for button below. Needs to delete selected note. Should only be 1 step. */}
      <button onClick={()=> props.deleteNote(props.selectedNote)}>Delete</button>
    </Fragment>
  )
}

export default NoteViewer;
