import React, { Fragment } from 'react';

const NoteViewer = (props) => {
  return (
    <Fragment>
      <h2>{props.currentNote.title}</h2>
      <p>{props.currentNote.body}</p>
      <button onClick={props.editNote}>Edit</button>
      <button onClick={props.deleteNote}>Delete</button>
    </Fragment>
  );
}

export default NoteViewer;
