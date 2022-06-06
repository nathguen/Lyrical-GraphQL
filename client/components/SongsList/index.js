import React from "react";
import { graphql } from "react-apollo";
import { hashHistory, Link } from "react-router";
import { deleteSongMutation, fetchSongsQuery } from "../../queries";

export const SongsList = (props) => {
  const {
    data: { songs, loading },
  } = props;

  /**
   * Deletes a song
   * @param {string} id
   */
  const deleteSong = (id) => {
    props
      .mutate({
        variables: { id },
      })
      .then(() => props.data.refetch());
  };

  if (loading) {
    return <div>...loading...</div>;
  }

  return (
    <div>
      <ul className="collection">
        {!!songs &&
          songs.map((song) => (
            <li className="collection-item" key={song.id}>
              <Link to={`/songs/${song.id}`}>{song.title}</Link>

              <i
                className="material-icons right delete-song"
                onClick={() => deleteSong(song.id)}
              >
                delete
              </i>
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

export default graphql(deleteSongMutation)(graphql(fetchSongsQuery)(SongsList));
