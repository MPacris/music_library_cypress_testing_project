import React, { useState } from 'react';
import axios from 'axios';
import './UpdateSongModal.css';

function UpdateSongModal({ song, onUpdate, onCancel }) {
  const [updatedSong, setUpdatedSong] = useState({ ...song });
  const [isUpdating, setIsUpdating] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUpdatedSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  }

  async function handleUpdate() {
    setIsUpdating(true);
    try {
      await axios.put(`http://127.0.0.1:5000/api/songs/${song.id}`, updatedSong);
      onUpdate();
    } catch (error) {
      console.log('Error in update song API call!', error);
    } finally {
      setIsUpdating(false);
    }
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div className="update-song-modal" data-cy ="update-song-modal">
      <h3>Edit Song</h3>
      <div className="input-group">
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" data-cy ="update-song-modal-title"value={updatedSong.title} onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label htmlFor="album">Album:</label>
        <input type="text" name="album" id="album" value={updatedSong.album} onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label htmlFor="artist">Artist:</label>
        <input type="text" name="artist" id="artist" value={updatedSong.artist} onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label htmlFor="genre">Genre:</label>
        <input type="text" name="genre" id="genre" value={updatedSong.genre} onChange={handleInputChange} />
      </div>
      <div className="input-group">
        <label htmlFor="release_date">Release Date:</label>
        <input
          type="text"
          name="release_date"
          id="release_date"
          value={updatedSong.release_date}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="running_time">Running Time (seconds):</label>
        <input
          type="number"
          name="running_time"
          id="running_time"
          value={updatedSong.running_time}
          onChange={handleInputChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="likes">Likes:</label>
        <input type="number" name="likes" id="likes" value={updatedSong.likes} onChange={handleInputChange} />
      </div>
      <div className="button-group">
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update'}
        </button>
      </div>
    </div>
  );
}

export default UpdateSongModal;