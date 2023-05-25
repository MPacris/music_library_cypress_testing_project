import React, { useState } from 'react';
import axios from 'axios';
import './AddSongForm.css';

function AddSongForm({ onAddSong, updateMusicTable }) {
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [runningTime, setRunningTime] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

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

      // Call the updateMusicTable function passed from the App component
      updateMusicTable();
    } catch (ex) {
      console.log('Error in add song API call!', ex);
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
        data-cy= "add-song-form_title"
        required
      />
      <input
        type="text"
        placeholder="Album"
        value={album}
        onChange={(event) => setAlbum(event.target.value)}
        data-cy="add-song-form_album"
      />
      <input
        type="text"
        placeholder="Artist"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
        data-cy="add-song-form_artist"
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(event) => setGenre(event.target.value)}
        data-cy="add-song-form_genre"
      />
      <input
        type="text"
        placeholder="Release Date (yyyy-mm-dd)"
        pattern="\d{4}-\d{2}-\d{2}"
        value={releaseDate}
        onChange={(event) => setReleaseDate(event.target.value)}
        data-cy="add-song-form_release-date"
      />
      <input
        type="text"
        placeholder="Running Time"
        value={runningTime}
        onChange={(event) => setRunningTime(event.target.value)}
        data-cy="add-song-form_running-time"
      />
      <button type="submit"  data-cy="add-song-form_submit-button" >Add Song</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}

export default AddSongForm;