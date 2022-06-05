import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { useRouterHistory } from "react-router";

export const SongsList = (props) => {
  const history = useRouterHistory();

  const {
    data: { songs, loading },
  } = props;

  const goToSong = (songId) => {
    history.push(`/songs/${songId}`);
  };

  if (loading) {
    return <div>...loading...</div>;
  }

  return (
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
  );
};

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongsList);
