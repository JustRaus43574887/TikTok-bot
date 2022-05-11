import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse } from "http";
import apolloConfig from "../../src/apollo/server/config";

const apolloServer = new ApolloServer(apolloConfig);

const startServer = apolloServer.start();

export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: process.env.ENDPOINT,
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
