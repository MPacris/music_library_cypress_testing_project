import React, { useState } from 'react';
import './SearchBar.css'

function SearchBar({ onSearch, onCancelSearch }) {
  const [term, setTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(term);
  }

  function handleCancel(event) {
    event.preventDefault();
    setTerm('');
    onCancelSearch();
  }

  return (
    <form onSubmit={handleSubmit} className='search-bar-section'>
      <h3>Search Bar</h3>
      <input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        className='search-bar'
      />
      <div className='search-bar-buttons'>
      <button type="submit">Search</button>
      <button type="button" onClick={handleCancel}>Clear</button>
      </div>
    </form>
  );
}

export default SearchBar;