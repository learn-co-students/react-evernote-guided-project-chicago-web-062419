import React, { Component } from 'react';
// pass prop of editedNote to render
class NoteEditor extends Component {
  constructor(props){
    super(props)
    this.state={
      title: this.props.editedNote.title,
      body: this.props.editedNote.body,
      id: this.props.editedNote.id
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    }, () => {
      this.props.updateNote(this.state)
    }, ()=>{
      this.props.showNewNote(this.state)
    });
  }

  render() {
    return (
      <form className="note-editor" onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} type="text" name="title" defaultValue={this.props.editedNote.title}/>
        <textarea onChange={this.handleChange} name="body" defaultValue={this.props.editedNote.body}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button onClick={()=> this.props.showNote(this.props.editedNote)} type="button">Cancel</button> 
        </div>
      </form>
    );
  }
}

export default NoteEditor;
