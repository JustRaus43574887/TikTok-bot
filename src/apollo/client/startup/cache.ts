import { InMemoryCache, makeVar } from "@apollo/client";
import { AlertColor } from "@mui/material";

type SnackbarMessageVar = { message: string; type: AlertColor } | null;

export const showMessage = makeVar<SnackbarMessageVar>(null);

const cache = new InMemoryCache();

export default cache;
