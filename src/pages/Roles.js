import React, { useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions,
   DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", permissions: [] });
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const response = await axios.get("http://localhost:5000/roles");
    setRoles(response.data);
  };

  const handleOpen = (role = null) => {
    setEditingRole(role);
    setFormData(role || { name: "", permissions: [] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", permissions: [] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingRole) {
      await axios.put(`http://localhost:5000/roles/${editingRole.id}`, formData);
    } else {
      await axios.post("http://localhost:5000/roles", { ...formData, id: roles.length + 1 });
    }
    fetchRoles();
    handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await axios.delete(`http://localhost:5000/roles/${id}`);
      fetchRoles();
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
        Add Role
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Role Name</StyledTableCell>
              <StyledTableCell>Permissions</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <StyledTableRow key={role.id}>
                <StyledTableCell>{role.id}</StyledTableCell>
                <StyledTableCell>{role.name}</StyledTableCell>
                <StyledTableCell>{role.permissions.join(", ")}</StyledTableCell>
                <StyledTableCell>
                  <Button variant="outlined" color="primary" size="small" onClick={() => handleOpen(role)}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => handleDelete(role.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Permissions (comma-separated)"
            name="permissions"
            value={formData.permissions}
            onChange={(e) =>
              setFormData({ ...formData, permissions: e.target.value.split(",").map((perm) => perm.trim()) })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingRole ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Roles;
