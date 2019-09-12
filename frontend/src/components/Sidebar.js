import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {

  render() {

    
    return (
      <div className='master-detail-element sidebar'>
        <NoteList select={this.props.select} notes={this.props.notes} />
        <button onClick={() => this.props.new()}>New</button>
      </div>
    );
  }
}

export default Sidebar;
