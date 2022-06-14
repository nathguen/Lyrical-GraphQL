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
        likes
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
