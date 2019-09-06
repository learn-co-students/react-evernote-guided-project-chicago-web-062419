import React from "react";

const NoteItem = props => {
  const handleClick = () =>{
    props.setSelectedNote(props.note)
  }
  return (
    // pass down title/caption props from the iterator
    <li onClick={handleClick}>
      <h2>{props.note.title}</h2>
      <p>{props.note.body.substring(0, 20) + "..."}</p>
    </li>
  );
};

export default NoteItem;
