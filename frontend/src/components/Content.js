import React, { Component } from 'react';
// import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';
import NoteEditor from './NoteEditor';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
    

  renderContent = () => {
   return(
           (this.props.clicked && <NoteEditor  
                                      cancel={this.props.cancel} 
                                      selected={this.props.select} 
                                      edit={this.props.edit} 
                                      save={this.props.save} />)
      ||   ( this.props.select && <NoteViewer 
                                      clickEdit={this.props.clickEdit} 
                                      select={this.props.select} />)
      ||                      <Instructions />)
    
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
