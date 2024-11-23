import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import axios from "axios";

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/permissions").then((response) => {
      setPermissions(response.data);
    });
  }, []);

  return (
    <Paper style={{ padding: 20 }}>
      <h2>Available Permissions</h2>
      <List>
        {permissions.map((permission, index) => (
          <ListItem key={index}>
            <ListItemText primary={permission} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Permissions;
