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
  constructor(props){
    super()
    this.state ={
      currentNote: {} , 
      editingNote: false
    }
  }
  renderContent = () => {
    if(this.state.editingNote && this.isNotePopulated()){
      return <NoteEditor currentNote={this.props.currentNote}/>;
    } else if (this.isNotePopulated()) {
      return <NoteViewer currentNote={this.props.currentNote} editNote={this.editNote}/>;
    } else {
      return <Instructions />;
    }
  }

  editNote = () =>{
    this.setState({editingNote : true})
  }

  isNotePopulated = () =>{
    return Object.keys(this.props.currentNote).length !== 0 
  }

  componentDidMount(){
    this.setState({currentNote: this.props.currentNote})
  }

  componentDidUpdate(prevState){
      if(this.state.currentNote !== prevState.currentNote)
        this.setState({currentNote: this.props.currentNote})
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
