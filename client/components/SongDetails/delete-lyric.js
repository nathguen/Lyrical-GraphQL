import React from "react";
import { graphql } from "react-apollo";
import { deleteLyricMutation, fetchSongQuery } from "../../queries";

const DeleteLyric = ({ mutate, id, songId }) => {
  const onDelete = (event) => {
    event.preventDefault();

    mutate({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: fetchSongQuery,
          variables: {
            id: songId,
          },
        },
      ],
      optimisticResponse: {
        __typename: "Mutation",
        deleteLyric: {
          __typename: "LyricType",
          id,
        },
      },
    });
  };

  return (
    <i
      onClick={(e) => onDelete(e)}
      style={{
        cursor: "pointer",
      }}
      className="material-icons"
    >
      delete
    </i>
  );
};

export default graphql(deleteLyricMutation)(DeleteLyric);
