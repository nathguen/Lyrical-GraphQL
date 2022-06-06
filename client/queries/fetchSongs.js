import gql from "graphql-tag";

export const fetchSongsQuery = gql`
  {
    songs {
      id
      title
    }
  }
`;
