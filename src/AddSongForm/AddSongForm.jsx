import React, { useState } from 'react';
import axios from 'axios';
import './AddSongForm.css';

function AddSongForm({ onAddSong }) {
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [runningTime, setRunningTime] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const confirmAdd = window.confirm('"The Music Library wants to know... Are you sure you want to add this song to the library?"');
    if (confirmAdd) {
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/songs', {
          title,
          album,
          artist,
          genre,
          release_date: releaseDate,
          running_time: runningTime,
        });
        const newSong = response.data;
        onAddSong(newSong);
        setTitle('');
        setAlbum('');
        setArtist('');
        setGenre('');
        setReleaseDate('');
        setRunningTime('');
      } catch (ex) {
        console.log('Error in add song API call!', ex);
      }
    }
  }

  function handleCancel() {
    setTitle('');
    setAlbum('');
    setArtist('');
    setGenre('');
    setReleaseDate('');
    setRunningTime('');
  }

  return (
    <form onSubmit={handleSubmit} className='add-song-form'>
      <h3>Add Song</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Album"
        value={album}
        onChange={(event) => setAlbum(event.target.value)}
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
      />
      <input
        type="text"
        placeholder="Release Date (yyyy-mm-dd)"
        pattern="\d{4}-\d{2}-\d{2}"
        value={releaseDate}
        onChange={(event) => setReleaseDate(event.target.value)}
      />
      <input
        type="text"
        placeholder="Running Time"
        value={runningTime}
        onChange={(event) => setRunningTime(event.target.value)}
      />
      <button type="submit">Add Song</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default AddSongForm;