import React from 'react';

const Search = (props) => {
  function handleSeachQuery(event){
    const handler = props.handleSearchQuery;
    handler(event.target.value)
  }
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        onChange={handleSeachQuery}
      />
    </div>
  );
}

export default Search;
