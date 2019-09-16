import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
  renderContent = () => {
    if (this.props.editClicked) {
      return <NoteEditor toggleEditClicked={this.props.toggleEditClicked} updateNotesArray={this.props.updateNotesArray} selected={this.props.selected} handleChange={this.props.handleChange} deleteNote={this.props.deleteNote}  />;
    } else if (this.props.selected) {
      return <NoteViewer toggleEditClicked={this.props.toggleEditClicked} editClicked={this.props.editClicked} selected={this.props.selected} selectNote={this.props.selectNote} />;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
