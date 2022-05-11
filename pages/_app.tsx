import "../styles/globals.css";
import type { AppProps as NextAppProps } from "next/app";
import createEmotionCache from "../src/utils/createEmotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/utils/theme";
import { CssBaseline } from "@mui/material";
import dynamic from "next/dynamic";
import FullScreenLoader from "../src/components/FullScreenLoader";
import { ApolloProvider } from "@apollo/client";
import { InitialState, useApollo } from "../src/apollo/client/startup";
import cache from "../src/apollo/client/startup/cache";

const AppBarDrawerSnak = dynamic(
  () => import("../src/wraps/AppBarDrawerSnak"),
  {
    ssr: false,
    loading: () => <FullScreenLoader />,
  }
);

const clientSideEmotionCache = createEmotionCache();

type PageProps = {
  initialApolloState: InitialState;
};

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

interface AppPropsWithCache extends AppProps<PageProps> {
  emotionCache: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps = { initialApolloState: cache.extract() },
}: AppPropsWithCache) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBarDrawerSnak>
            <Component {...pageProps} />
          </AppBarDrawerSnak>
        </ThemeProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default MyApp;
