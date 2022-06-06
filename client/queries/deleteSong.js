import gql from "graphql-tag";

export const deleteSongMutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
