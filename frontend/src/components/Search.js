import React from 'react';

const Search = (props) => {
  
  return (
    <div className="filter" >
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={props.handleChange}
      />
    </div>
  );
}

// const handleChange = (event) => {
//   this.setState({[event.target.title]: event.target.value})
// }

export default Search;
