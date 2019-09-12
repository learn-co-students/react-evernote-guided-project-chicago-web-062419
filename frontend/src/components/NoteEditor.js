import React, { Component } from 'react';

class NoteEditor extends Component {

  editTitle = (event) => {
    this.props.edit(event.target.value, undefined)
 }

   editBody = (event) => {
    this.props.edit(undefined, event.target.value)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.save()
  }

  render() {
    return (
      <form  key={this.props.selected.id} onSubmit={this.handleSubmit} className="note-editor">
        <input onChange={this.editTitle} defaultValue={this.props.selected.title} type="text" name="title" />
        <textarea onChange={this.editBody} name="body"
        defaultValue={this.props.selected.body} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button onClick={() => this.props.cancel()} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
