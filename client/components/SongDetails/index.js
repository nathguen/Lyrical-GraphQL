import React, { useState } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import {
  addLyricMutation,
  fetchSongQuery,
  fetchSongsQuery,
} from "../../queries";

const SongDetails = (props) => {
  const {
    data: { loading },
  } = props;

  const [lyric, setLyric] = useState("");

  if (loading) {
    return <div>...loading...</div>;
  }

  const {
    data: {
      song: { title, id, lyrics },
    },
  } = props;

  const onSubmit = (event) => {
    event.preventDefault();

    if (!lyric) {
      return;
    }

    props
      .mutate({
        variables: {
          songId: id,
          content: lyric,
        },
        refetchQueries: [
          {
            query: fetchSongsQuery,
          },
        ],
      })
      .then(() => {
        setLyric("");
        props.data.refetch();
      });
  };

  return (
    <div>
      <Link to="/" className="btn-large blue">
        <i className="material-icons">arrow_back</i>
      </Link>
      <h3>{title}</h3>

      <form onSubmit={onSubmit}>
        <label id="lyric-content">Lyric</label>
        <input
          name="lyric-content"
          type="text"
          value={lyric}
          onChange={(e) => setLyric(e.target.value)}
        />
      </form>

      {!!lyrics && lyrics.length > 0 && (
        <ul className="collection">
          {lyrics.map((lyric) => (
            <li key={lyric.id} className="collection-item">
              {lyric.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default graphql(addLyricMutation)(
  graphql(fetchSongQuery, {
    options: (props) => ({
      variables: { id: props.params.id },
    }),
  })(SongDetails)
);
