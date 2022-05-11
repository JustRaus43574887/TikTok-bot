import { Config } from "apollo-server-micro";
import { db } from "../../../src/utils/firebase";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import BloggerAPI from "./datasources/blogger";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

type Context = {};

type DataSources = {
  bloggerAPI: BloggerAPI;
};

export interface ApolloContext extends Context {
  dataSources: DataSources;
}

const dataSources = (): DataSources => ({
  bloggerAPI: new BloggerAPI(db),
});

const context: Config["context"] = async ({ req, res }): Promise<Context> => {
  return {};
};

const apolloConfig: Config = {
  typeDefs,
  resolvers,
  dataSources,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
};

export default apolloConfig;
