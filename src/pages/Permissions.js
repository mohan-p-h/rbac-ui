import React, { useEffect, useState } from "react";
import { Typography, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";
import axios from "axios";
// import Grid from '@mui/material/Grid';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const response = await axios.get("http://localhost:5000/permissions");
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
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Permissions
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ marginBottom: "20px" }}
      >
        Create New Permission
      </Button>

      <Box display="flex" flexWrap="wrap" gap={3} sx={{ padding: 3 }} >
        {permissions.map((permission) => (
          <Box key={permission.id} sx={{ flex: "1 1 calc(33.333% - 24px)", maxWidth: "calc(33.333% - 24px)", boxSizing: "border-box", }} >
            <Paper elevation={3}>
              <Box padding={2}>
                <Typography variant="h6">{permission.name}</Typography>
                <Box mt={2}>
                  <Button variant="outlined" color="secondary" size="small" onClick={() => handleDelete(permission.id)} >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Dialog for adding new permission */}
      <Dialog maxWidth="sm" open={open} onClose={() => setOpen(false)}>
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
    </Box>
  );
};

export default Permissions;
