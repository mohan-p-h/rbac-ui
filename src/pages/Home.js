import React from "react";
import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Use the navigation bar to manage users, roles, and permissions.
      </Typography>
    </Box>
  );
};

export default Home;
