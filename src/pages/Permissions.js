import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";
import axios from "axios";

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const response = await axios.get("http://localhost:5000/permissions");
    console.log("FetchData Permission ",response.data);
    setPermissions(response.data);
  };

  const handleAdd = async () => {
    if (newPermission.trim()) {
      const newPermObject = { id: (permissions.length + 1).toString(), name: newPermission }; // Generate a unique ID
      await axios.post("http://localhost:5000/permissions", newPermObject);
      fetchPermissions();
      setNewPermission("");
      setOpen(false);
    }
  };

  const handleDelete = async (id) => {
    alert(id);
    if (window.confirm("Are you sure you want to delete this permission?")) {
      try {
        await axios.delete(`http://localhost:5000/permissions/${id}`);
        fetchPermissions(); // Refresh the permissions list
      } catch (error) {
        console.error("Error deleting permission:", error);
        alert("Failed to delete permission. Please try again.");
      }
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <h2>Permissions</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ marginBottom: "10px" }}>
        Create New Permission
      </Button>
      <List>
        {permissions.map((permission) => (
          <ListItem
            key={permission.id}
            secondaryAction={
              <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(permission.id)} >
                Delete
              </Button>
            } >
            <ListItemText primary={permission.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Permission</DialogTitle>
        <DialogContent>
          <TextField
            label="Permission Name"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Permissions;
