import gql from "graphql-tag";

export const fetchSongQuery = gql`
  query FetchSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;
