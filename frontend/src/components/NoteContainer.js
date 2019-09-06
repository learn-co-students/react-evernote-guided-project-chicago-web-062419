import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {
  constructor(){
    super()
    this.state={
      notes: [] ,
      currentNote: {}
    }
  }
  // this should save the state between the sidebar and the content panels

  getNotes = () =>{
    fetch('http://localhost:3000/api/v1/notes')
    .then(resp =>{return resp.json()})
    .then(json => {
      this.setState({ notes: json})
    })
  }

  componentDidMount(){
    this.getNotes();
  }

  setSelectedNote = (note) =>{
    console.log('there is a new note!')
    this.setState({currentNote: note})
  }

  componentDidUpdate(prevState){
    console.log('Note Container has updated')
    console.log(this.state.currentNote)
  }

  render() {
    return (
      <Fragment>
        <Search />
        <div className='container'>
          <Sidebar notes={this.state.notes} setSelectedNote={this.setSelectedNote}/>
          <Content currentNote={this.state.currentNote}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
