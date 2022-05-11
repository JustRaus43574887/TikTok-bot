import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Blogger {
    id: String!
    name: String!
    tiktok_id: String!
  }

  input BloggerArgs {
    name: String!
    tiktok_id: String!
  }

  type Query {
    bloggers: [Blogger!]!
  }

  type Mutation {
    createBlogger(args: BloggerArgs): Blogger!
  }
`;

export default typeDefs;
