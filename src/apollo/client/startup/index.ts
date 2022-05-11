import { ApolloClient, HttpLink, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";
import cache from "./cache";

export type InitialState = NormalizedCacheObject | null;

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createLink() {
  return new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_PATH,
  });
}

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createLink(),
    cache,
  });

export function initializeApollo(initialState: InitialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: InitialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
