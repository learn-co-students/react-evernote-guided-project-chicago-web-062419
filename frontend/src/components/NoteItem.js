import React from 'react';

const NoteItem = (props) => (
  <li onClick={() => props.select(props.note)}>
    <h2>{props.note.title}</h2>
    <p>{props.note.body}</p>
    <div className='time'>
    <h5>{"created: " + props.note.created_at.slice(0, 10) + " at " + props.note.created_at.slice(11, 19)}</h5>
    <h5>{"edited: " + props.note.updated_at.slice(0, 10) + " at " + props.note.updated_at.slice(11, 19)}</h5>
    </div>
  </li>
);

export default NoteItem;
