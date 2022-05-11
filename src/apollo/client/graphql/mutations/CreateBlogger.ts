import { gql } from "@apollo/client";
import BLOGGER_FRAGMENT from "../fragments/Blogger";

const CREATE_BLOGGER_MUTATION = gql`
  ${BLOGGER_FRAGMENT}
  mutation CreateBlogger($args: BloggerArgs) {
    createBlogger(args: $args) {
      ...BloggerFragment
    }
  }
`;

export default CREATE_BLOGGER_MUTATION;
