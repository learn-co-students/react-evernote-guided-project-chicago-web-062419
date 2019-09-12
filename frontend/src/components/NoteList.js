import React from 'react';
import NoteItem from './NoteItem';

const NoteList = (props) => {
  return (
    <ul>
      {props.notes.map(item =>
      <NoteItem select={props.select} key={item.id} note={item}/>)}
    </ul>
  );
}

export default NoteList;
