import React from 'react';

const Search = (props) => {
  return (
    <div className="filter">

      <input
        onChange={(e) => props.handleSearch(e)}
        //callback function, handleSearch that talks to the parent, it is invoked and calls upon the event, e. 
        id="search-bar"
        type="text"
        placeholder="Search Notes"
      />
    </div>
  );
}

export default Search;
