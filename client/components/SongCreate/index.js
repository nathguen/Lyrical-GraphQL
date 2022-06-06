import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { fetchSongsQuery } from "../../queries";

const SongCreate = (props) => {
  const [title, setTitle] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    props
      .mutate({
        variables: {
          title,
        },
        refetchQueries: [
          {
            query: fetchSongsQuery,
          },
        ],
      })
      .then(() => {
        setTitle("");
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label id="song-title">Create a new song</label>
        <input
          placeholder="Song title..."
          name="song-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
