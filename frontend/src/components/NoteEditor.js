import React, { Component } from 'react';

class NoteEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.selected.title,
      body: this.props.selected.body,
      id: this.props.selected.id
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange(event) {
    const { name, value } = event.target
    console.log(value)
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    //function that will invoke the fetch function that was passed as a prop and passing in the state
    event.preventDefault()
    fetch(`http://localhost:3000/api/v1/notes/${this.state.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        id: this.state.id,
      })
    })
      .then(response => response.json())
      .then(note => {this.props.updateNotesArray(note)})
      .then(updatedNote => {this.props.toggleEditClicked(updatedNote)})
      // .then(updatedNote => {this.props.selectNote(updatedNote)}
        // 
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="note-editor">
        < input type="text"
          defaultValue={this.state.title}
          name="title" onChange={this.handleChange} />
        < textarea name="body"
          defaultValue={this.state.body}
          onChange={this.handleChange} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button onClick={this.props.toggleEditClicked} type="button">Cancel</button>
          <button onClick={this.props.deleteNote} type="button">Delete</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;

