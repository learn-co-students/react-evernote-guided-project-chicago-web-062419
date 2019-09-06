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
      currentNote: {}
    }
  }
  renderContent = () => {
    if(false){
      return <NoteEditor />;
    } else if (Object.keys(this.props.currentNote).length !== 0 ) {
      console.log(this.props.currentNote)
      return <NoteViewer currentNote={this.props.currentNote}/>;
    } else {
      return <Instructions />;
    }
  }

  componentDidMount(){
    this.setState({currentNote: this.props.currentNote})
  }

  componentDidUpdate(prevState){
    console.log('Content has updated')
    console.log(this.state.currentNote)
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
