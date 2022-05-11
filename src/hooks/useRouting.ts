import React from "react";
import { useRouter } from "next/router";

type Returns = {
  loading: boolean;
  pathname: string;
};

const useRouting = (): Returns => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const { events, pathname } = useRouter();

  React.useEffect(() => {
    events.on("routeChangeStart", () => {
      setLoading(true);
    });
    events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, []);

  return { loading, pathname };
};

export default useRouting;
