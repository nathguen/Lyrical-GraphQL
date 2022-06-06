import React from "react";
import { graphql } from "react-apollo";
import { fetchSongQuery } from "../../queries";

const SongDetails = (props) => {
  const {
    data: { loading },
  } = props;

  if (loading) {
    return <div>...loading...</div>;
  }

  const {
    data: {
      song: { title, id, lyrics },
    },
  } = props;

  return (
    <div>
      <h3>{title}</h3>

      <ul className="collection">
        {!!lyrics &&
          lyrics.map((lyric) => (
            <li key={lyric.id} className="collection-item">
              {lyric.content}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default graphql(fetchSongQuery, {
  options: (props) => ({
    variables: { id: props.params.id },
  }),
})(SongDetails);
