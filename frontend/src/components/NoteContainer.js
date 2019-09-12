import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  constructor(){
    super()
    this.state = {
        notes: [],
        selected: null,
        clicked: false,
        filter: ''
    }
  }
    componentDidMount(){
      fetch('http://localhost:3000/api/v1/notes')
      .then(res => res.json())
      .then(data => {
        this.setState({notes: data})
      })
   }

   selectNote = (el) => {
     this.setState({
         selected: el,
         clicked: false
       })
   }

   addNew = () => {
    fetch('http://localhost:3000/api/v1/notes', {
      method: "POST",
      headers: {"Content-Type": "application/json",  
        "Accept": "application/json"},
        body: JSON.stringify({user_id:1, title:'default', body:'placeholder'})
    })
    .then(resp => resp.json())
    .then(item => {
      this.setState((prevState) => { return {notes: [...prevState.notes, item]}})
    })
   }

   clickEdit = () => {
     this.setState({clicked: true})
   }

   cancelEdit = () => {
     this.setState({clicked: false})
   }

  

  editItem = (title=this.state.selected.title, body=this.state.selected.body) => {
     this.setState((prevState) => {
       return {selected: {user_id:1, id: prevState.selected.id, title: title, body:body}}
     })
    
 }

 updateItem = () => {
  fetch(`http://localhost:3000/api/v1/notes/${this.state.selected.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json",  
      "Accept": "application/json"},
      body: JSON.stringify({
                     title:this.state.selected.title, 
                     body:this.state.selected.body, 
                     user:{id:1, name: 'ipadurean79'}})
     })
    .then(resp => resp.json())
    .then(item => {
      this.setState((prevState) => {
        return {
          notes: [item, ...[...prevState.notes].filter(el => el.id !== this.state.selected.id)].sort(function(a, b){return a.id-b.id}),
        clicked: false

      }})
  })
 }

 search = (value) => {
    this.setState({filter: value})
 }

 filterNotes = () => {
   return (this.state.filter === "sort by created")? 
   (this.state.notes.sort(function(a, b){return Date.parse(b.created_at)-Date.parse(a.created_at)})) :
   (this.state.filter === "sort by edited")? 
   (this.state.notes.sort(function(a, b){return Date.parse(b.updated_at)-Date.parse(a.updated_at)})) :
   (this.state.notes.filter(note => (note.title + " " + note.body + "edited " + note.updated_at + "created " + note.created_at).toLowerCase().includes(this.state.filter.toLowerCase())))
   }
 
  
  render() {
  
    return (
      <Fragment>
        <Search search={this.search} />
        <div className='container'>
        <Sidebar 
             new={this.addNew} 
             select={this.selectNote} 
             notes={this.state.filter? this.filterNotes() : this.state.notes}  />
        <Content 
             view={this.viewItem} 
             select={this.state.selected} 
             edit={this.editItem} 
             save={this.updateItem} 
             clicked={this.state.clicked} 
             clickEdit={this.clickEdit} 
             cancel={this.cancelEdit} />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
