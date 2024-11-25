import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} >
          Admin
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/roles">
          Roles
        </Button>
        <Button color="inherit" component={Link} to="/permissions">
          Permissions
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
