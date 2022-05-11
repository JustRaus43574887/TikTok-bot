import React from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  styled,
  SwipeableDrawer,
  Toolbar,
  Typography,
  Snackbar,
} from "@mui/material";

import { withUserAgent, WithUserAgentProps } from "next-useragent";
import useRouting from "../hooks/useRouting";

import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ListIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/AddBox";
import Link from "next/link";

import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useReactiveVar } from "@apollo/client";
import { showMessage } from "../apollo/client/startup/cache";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type MainProps = { open: boolean; isdesktop: boolean };

type NavList = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const list: NavList[] = [
  {
    name: "Список блоггеров",
    icon: <ListIcon />,
    path: "",
  },
  {
    name: "Добавить блоггера",
    icon: <AddIcon />,
    path: "add",
  },
];

const drawerWidth = 240;

const Main = styled("main")<MainProps>(({ theme, open, isdesktop }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: isdesktop && !open ? -drawerWidth : 0,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const AppBarAndDrawer: React.FC<WithUserAgentProps> = ({ ua, children }) => {
  const snackbarMessage = useReactiveVar(showMessage);

  const [open, setOpen] = React.useState<boolean>(!!ua?.isDesktop);

  const { loading, pathname } = useRouting();
  const isError = pathname.includes("_error");

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    showMessage(null);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  React.useEffect(() => {
    if (loading && !ua?.isDesktop) setOpen(false);
  }, [loading, ua]);

  if (isError) return <>{children}</>;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(!open)}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ArrowBackIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            TikTok bot
          </Typography>
        </Toolbar>
        {loading && <LinearProgress />}
      </AppBar>
      <SwipeableDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ["& .MuiDrawer-paper"]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={ua?.isDesktop ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableBackdropTransition={!!ua?.isAndroid}
        disableDiscovery={!!!ua?.isAndroid}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {list.map((item, index) => (
              <Link key={index} href={`/${item.path}`}>
                <ListItemButton
                  LinkComponent={MuiLink}
                  selected={pathname.split("/").slice(1).includes(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
      <Main open={open} isdesktop={!!ua?.isDesktop}>
        <Toolbar />
        <Container>{children}</Container>
      </Main>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={!!snackbarMessage}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={snackbarMessage?.type}
          sx={{ width: "100%" }}
        >
          {snackbarMessage?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default withUserAgent(AppBarAndDrawer);
