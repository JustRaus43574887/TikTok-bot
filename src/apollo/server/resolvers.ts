import { ApolloContext } from "./config";

const resolvers = {
  Query: {
    bloggers: async (
      _: any,
      __: any,
      { dataSources }: ApolloContext
    ): Promise<AppTypes.Blogger[]> => {
      return dataSources.bloggerAPI.getBloggers();
    },
  },
  Mutation: {
    createBlogger: async (
      _: any,
      { args }: { args: AppTypes.BloggerArgs },
      { dataSources }: ApolloContext
    ) => {
      return dataSources.bloggerAPI.createBlogger(args);
    },
  },
};

export default resolvers;
