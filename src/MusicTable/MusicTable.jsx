import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateSongModal from '../UpdateSongModal/UpdateSongModal';
import './MusicTable.css';

function MusicTable({ songs }) {
  const [selectedSong, setSelectedSong] = useState(null);
  const [totalRunningTime, setTotalRunningTime] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    function calculateTotalRunningTime() {
      let total = 0;
      songs.forEach((song) => {
        total += song.running_time;
      });
      setTotalRunningTime(total);
    }

    calculateTotalRunningTime();
  }, [songs]);

  function handleUpdate(song) {
    setSelectedSong(song);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setSelectedSong(null);
    setIsModalOpen(false);
  }

  function handleCancel() {
    handleCloseModal();
  }

  function handleDelete(songId) {
    try {
      axios.delete(`http://127.0.0.1:5000/api/songs/${songId}`).then(() => {
        fetchData(); // Refresh data after deletion
      });
    } catch (error) {
      console.log('Error in delete song API call!', error);
    }
  }

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  async function fetchData() {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/songs');
      setSelectedSong(response.data.songs);
    } catch (ex) {
      console.log('Error in fetchData API call!');
    }
  }

  return (
    <div className="bottom-container">
      <h3>Music Library</h3>
      <div className="running-time-summary">
        Total Running Time: {formatTime(totalRunningTime)} minutes
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <UpdateSongModal song={selectedSong} onUpdate={handleCloseModal} onCancel={handleCancel} />
          </div>
        </div>
      )}
      <table className="music-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>R.T. (seconds)</th>
            <th>Likes</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody data-cy="music-table-data">
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.album}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>{song.release_date}</td>
              <td>{song.running_time}</td>
              <td>{song.likes}</td>
              <td>
                <button onClick={() => handleUpdate(song)}>Edit</button>
              </td>
              <td>
              <button onClick={() => handleDelete(song.id)} data-cy="music-table-delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MusicTable;