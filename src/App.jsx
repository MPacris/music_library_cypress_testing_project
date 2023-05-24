import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicTable from './MusicTable/MusicTable';
import SearchBar from './SearchBar/SearchBar';
import Filter from './Filter/Filter';
import AddSongForm from './AddSongForm/AddSongForm';
import './App.css';


function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/songs');
      setSongs(response.data.songs);
      setFilteredSongs(response.data.songs);
    } catch (ex) {
      console.log('Error in fetchData API call!');
    }
  }

  function handleSearch(term) {
    const filtered = songs.filter((song) => {
      const searchTerm = term.toLowerCase();
      return (
        song.title.toLowerCase().includes(searchTerm) ||
        song.album.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.genre.toLowerCase().includes(searchTerm) ||
        song.release_date.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredSongs(filtered);
  }

  function handleCancelSearch() {
    setFilteredSongs(songs);
  }

  function handleFilter(filterType, filterValue) {
    const filtered = songs.filter((song) => {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      const filterChoices = {
        album: song.album.toLowerCase(),
        artist: song.artist.toLowerCase(),
        genre: song.genre.toLowerCase(),
        releaseDate: song.release_date.toLowerCase(),
        runningTime: song.running_time.toString(),
        title: song.title.toLowerCase()
      };
  
      if (filterType in filterChoices) {
        return filterChoices[filterType].includes(lowerCaseFilterValue);
      } else {
        return true;
      }
    });
  
    setFilteredSongs(filtered);
  }

  function handleResetFilter() {
    setFilteredSongs(songs);
  }

  async function addSong(songData) {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/songs', songData);
      setSongs([...songs, response.data.song]);
      setFilteredSongs([...filteredSongs, response.data.song]);
    } catch (ex) {
      console.log('Error in addSong API call!');
    }
  }

  return (
    <div className='container-all'>
      <h1 className='header'>Music Library</h1>

      <div className='action-container'>
        <div className='search-bar'>
          <SearchBar onSearch={handleSearch} onCancelSearch={handleCancelSearch} />
        </div>

        <div className='filter-section'>
          <Filter onFilter={handleFilter} onResetFilter={handleResetFilter} />
        </div>

        <div className='add-song-form'>
          <AddSongForm onAddSong={addSong} />
        </div>
      </div>

      <div className='table-container'>
        <MusicTable songs={filteredSongs} />
      </div>
    </div>
  );
}

export default App;