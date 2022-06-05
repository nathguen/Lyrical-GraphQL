import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const SongCreate = (props) => {
  const [title, setTitle] = React.useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    props.mutate({
      variables: {
        title,
      },
    });
  };

  return (
    <div>
      <h3>Create a New Song</h3>
      <form onSubmit={onSubmit}>
        <label id="song-title">Song Title:</label>
        <input
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
