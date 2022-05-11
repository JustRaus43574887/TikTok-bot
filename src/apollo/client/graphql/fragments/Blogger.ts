import { gql } from "@apollo/client";

const BLOGGER_FRAGMENT = gql`
  fragment BloggerFragment on Blogger {
    id
    name
    tiktok_id
  }
`;

export default BLOGGER_FRAGMENT;
