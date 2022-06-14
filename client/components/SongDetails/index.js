import React from "react";
import { useState } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import { addLyricMutation, fetchSongQuery } from "../../queries";
import DeleteLyric from "./delete-lyric";
import Upvote from "./upvote";

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

    setLyric("");

    props.mutate({
      variables: {
        songId: id,
        content: lyric,
      },
      optimisticResponse: {
        addLyricToSong: {
          __typename: "SongType",
          id,
          title,
          lyrics: [
            ...lyrics,

            {
              __typename: "LyricType",
              id: `some-new-lyric-id--${lyrics.length + 1}`,
              content: lyric,
              likes: 0,
            },
          ],
        },
      },
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Upvote id={lyric.id} likes={lyric.likes} />
                <div
                  style={{
                    minWidth: 40,
                  }}
                >
                  {lyric.likes}
                </div>
                <DeleteLyric id={lyric.id} songId={id} />
              </div>
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
