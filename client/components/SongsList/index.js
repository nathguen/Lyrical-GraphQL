import React from "react";
import { graphql } from "react-apollo";
import { hashHistory, Link } from "react-router";
import { fetchSongsQuery } from "../../queries";

export const SongsList = (props) => {
  const {
    data: { songs, loading },
  } = props;

  const goToSong = (songId) => {
    hashHistory.push(`/songs/${songId}`);
  };

  if (loading) {
    return <div>...loading...</div>;
  }

  return (
    <div>
      <ul className="collection">
        {!!songs &&
          songs.map((song) => (
            <li
              onClick={() => goToSong(song.id)}
              className="collection-item"
              key={song.id}
            >
              {song.title}
            </li>
          ))}
      </ul>

      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
        Create Song
      </Link>
    </div>
  );
};

export default graphql(fetchSongsQuery)(SongsList);
