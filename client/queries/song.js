import gql from "graphql-tag";

export const deleteSongMutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

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

export const fetchSongsQuery = gql`
  {
    songs {
      id
      title
    }
  }
`;
