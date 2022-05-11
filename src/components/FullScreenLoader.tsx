import { Box, CircularProgress } from "@mui/material";
import React from "react";

const FullScreenLoader: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        position: "fixed",
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "tooltip",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default FullScreenLoader;
