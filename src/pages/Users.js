import React, { useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent,
   DialogTitle, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import AddEditUser from "../components/AddEditUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "Active" });
  const [editingUser, setEditingUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchStatuses();
    fetchPermissions();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const fetchRoles = async () => {
    const response = await axios.get("http://localhost:5000/roles");
    setRoles(response.data);
  };

  const fetchStatuses = async () => {
    const response = await axios.get("http://localhost:5000/statuses");
    setStatuses(response.data);
  };

  const fetchPermissions = async () => {
    const response = await axios.get("http://localhost:5000/permissions");
    setPermissions(response.data);
  };

  const handleOpen = (user = null) => {
    setEditingUser(user);
    setFormData(user || { name: "", email: "", role: "", status: "Active" });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", email: "", role: "", status: "Active" });
    setErrors({});
  };

  const getPermissionsByRole = (roleName) => {
    const role = roles.find((r) => r.name === roleName);
    if (!role) return [];
    return permissions.filter((p) => role.permissions.includes(p.id));
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Enter a valid email address.";
    }

    if (!formData.role) {
      validationErrors.role = "Role is required.";
    }

    if (!formData.status) {
      validationErrors.status = "Status is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Retain existing values and update the changed field
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (editingUser) {
      // Update existing user
      await axios.put(`http://localhost:5000/users/${editingUser.id}`, formData);
    } else {
      // Add new user
      await axios.post("http://localhost:5000/users", { ...formData, id: (users.length + 1).toString() });
    }
    fetchUsers();
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers();
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginBottom: "10px" }}>
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Permissions</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
              <StyledTableCell>{user.id}</StyledTableCell>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.role}</StyledTableCell>
              <StyledTableCell>
                {getPermissionsByRole(user.role)
                  .map((permission) => permission.name)
                  .join(", ")}
              </StyledTableCell>
              <StyledTableCell>{user.status}</StyledTableCell>
              <StyledTableCell>
                <Button variant="outlined" color="primary" size="small" onClick={() => handleOpen(user)}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" size="small" style={{ marginLeft: 10 }} onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal"
           error={!!errors.name} helperText={errors.name} />

          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal"
           error={!!errors.email} helperText={errors.email} />

          <TextField label="Role" variant="outlined" name="role" select fullWidth margin="normal" value={formData.role} onChange={handleChange}
            error={!!errors.role} helperText={errors.role}>
            {roles.map((r) => (
              <MenuItem key={r.id} value={r.name}>
                {r.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Status"
            name="status"
            select
            fullWidth
            margin="normal"
            value={formData.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
          >
            {statuses.map((status) => (
              <MenuItem key={status.id} value={status.status_name}>
                {status.status_name}
              </MenuItem>
            ))}
          </TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingUser ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
};

export default Users;
