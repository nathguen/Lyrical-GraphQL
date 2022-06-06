import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { hashHistory, Link } from "react-router";
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
      .then(() => hashHistory.push("/"));
  };

  return (
    <div>
      <Link to="/" className="btn-large blue">
        <i className="material-icons">arrow_back</i>
      </Link>
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
