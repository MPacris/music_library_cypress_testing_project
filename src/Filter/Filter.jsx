import React, { useState } from 'react';
import './Filter.css';

function Filter({ onFilter, onResetFilter }) {
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onFilter(filterType, filterValue);
  }

  function handleReset(event) {
    event.preventDefault();
    setFilterType('');
    setFilterValue('');
    onResetFilter();
  }

  return (
    <form className='filter-section'>
      <h3>Filter By</h3>
      <select value={filterType} onChange={(event) => setFilterType(event.target.value)}>
        <option value="">Select Filter Type</option>
        <option value="album">Album</option>
        <option value="artist">Artist</option>
        <option value="genre">Genre</option>
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
      <input
        type="text"
        placeholder="Filter Value"
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        required
      />
      <div>
        <button type="submit" onClick={handleSubmit}>Apply Filter</button>
        <button type="button" onClick={handleReset}>Reset Filter</button>
      </div>
    </form>
  );
}

export default Filter;