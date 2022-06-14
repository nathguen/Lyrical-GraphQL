import React from "react";
import { graphql } from "react-apollo";
import { likeLyricMutation } from "../../queries";

export const Upvote = ({ id, mutate, likes }) => {
  const onUpvote = () => {
    mutate({
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          __typename: "LyricType",
          id,
          likes: likes + 1,
        },
      },
    });
  };

  return (
    <i
      style={{
        cursor: "pointer",
        marginRight: 10,
      }}
      className="material-icons"
      onClick={onUpvote}
    >
      thumb_up
    </i>
  );
};

export default graphql(likeLyricMutation)(Upvote);
