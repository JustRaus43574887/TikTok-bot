import { gql } from "@apollo/client";
import BLOGGER_FRAGMENT from "../fragments/Blogger";

const BLOGGERS_QUERY = gql`
  ${BLOGGER_FRAGMENT}
  query Bloggers {
    bloggers {
      ...BloggerFragment
    }
  }
`;

export default BLOGGERS_QUERY;
