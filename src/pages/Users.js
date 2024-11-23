import React, { useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "Active" });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const handleOpen = (user = null) => {
    setEditingUser(user);
    setFormData(user || { name: "", email: "", role: "", status: "Active" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", email: "", role: "", status: "Active" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingUser) {
      // Update existing user
      await axios.put(`http://localhost:5000/users/${editingUser.id}`, formData);
    } else {
      // Add new user
      await axios.post("http://localhost:5000/users", { ...formData, id: users.length + 1 });
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
              
              {/* <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell> */}

              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (

              // <TableRow key={user.id}>
              //   <TableCell>{user.id}</TableCell>
              //   <TableCell>{user.name}</TableCell>
              //   <TableCell>{user.email}</TableCell>
              //   <TableCell>{user.role}</TableCell>
              //   <TableCell>{user.status}</TableCell>
              //   <TableCell>
              //     <Button variant="outlined" color="primary" size="small">
              //       Edit
              //     </Button>
              //     <Button variant="outlined" color="secondary" size="small" style={{ marginLeft: 10 }}>
              //       Delete
              //     </Button>
              //   </TableCell>
              // </TableRow>

              <StyledTableRow key={user.id}>
              <StyledTableCell>{user.id}</StyledTableCell>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.email}</StyledTableCell>
              <StyledTableCell>{user.role}</StyledTableCell>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
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
