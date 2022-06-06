import gql from "graphql-tag";

export const addLyricMutation = gql`
  mutation AddLyric($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      title
      lyrics {
        id
        content
      }
    }
  }
`;
