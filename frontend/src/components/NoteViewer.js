import React, { Fragment } from 'react';


const NoteViewer = (props) => {
  return (
    <Fragment>
      <h2>{props.selected.title}</h2>
      <p>{props.selected.body}</p>
      <button onClick={props.toggleEditClicked}>Edit</button>
    </Fragment>
  );
}

export default NoteViewer;
