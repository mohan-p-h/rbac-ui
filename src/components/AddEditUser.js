import React, { useState, useEffect } from "react";
import { Box, Button, TextField, MenuItem, Typography, Alert } from "@mui/material";
import axios from "axios";

const AddEditUser = ({ user, onSubmit, onCancel }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");
  const [status, setStatus] = useState(user?.status || "Active");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  // Fetch roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/roles");
        setRoles(response.data);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!role) {
      setError("Role is required.");
      return;
    }

    // Clear error
    setError("");

    // Submit form data
    const userData = {
      id: user?.id || Date.now().toString(), // Generate ID for new user
      name,
      email,
      role,
      status,
    };
    onSubmit(userData);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {user ? "Edit User" : "Add User"}
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Role"
          variant="outlined"
          select
          fullWidth
          margin="normal"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((r) => (
            <MenuItem key={r.id} value={r.name}>
              {r.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Status"
          variant="outlined"
          select
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            {user ? "Update" : "Add"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEditUser;
