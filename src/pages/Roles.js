import React, { useEffect, useState } from "react";
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions,
   DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [roleData, setRoleData] = useState({ name: "", permissions: [] });
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    const response = await axios.get("http://localhost:5000/roles");
    setRoles(response.data);
  };

  const fetchPermissions = async () => {
    const response = await axios.get("http://localhost:5000/permissions");
    setPermissions(response.data);
  };

  const handleRoleDialogOpen = (role = null) => {
    if (role) {
      setRoleData({
        id: role.id,
        name: role.name,
        permissions: role.permissions,
      });
    } else {
      setRoleData({ name: "", permissions: [] });
    }
    setRoleDialogOpen(true);
  };

  const handleRoleDialogClose = () => {
    setRoleDialogOpen(false);
  };

  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  // const handlePermissionToggle = (permissionId) => {
  //   setRoleData((prev) => ({
  //     ...prev,
  //     permissions: prev.permissions.includes(permissionId)
  //       ? prev.permissions.filter((id) => id !== permissionId)
  //       : [...prev.permissions, permissionId],
  //   }));
  // };

  const handlePermissionToggle = (permissionId) => {
    setRoleData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId) // Remove if already selected
        : [...prev.permissions, permissionId], // Add if not selected
    }));
  };

  const handleRoleSubmit = async () => {
    if (roleData.id) {
      await axios.put(`http://localhost:5000/roles/${roleData.id}`, roleData);
    } else {
      await axios.post("http://localhost:5000/roles", {
        ...roleData,
        id: (roles.length + 1).toString(),
      });
    }
    fetchRoles();
    handleRoleDialogClose();
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleRoleDialogOpen()}
        style={{ marginBottom: "10px" }}
      >
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
                <StyledTableCell>
                  {permissions
                    .filter((perm) => role.permissions.includes(perm.id))
                    .map((perm) => perm.name)
                    .join(", ")}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleRoleDialogOpen(role)}
                  >
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

      <Dialog open={roleDialogOpen} onClose={handleRoleDialogClose}>
        <DialogTitle>{roleData.id ? "Edit Role" : "Create Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            name="name"
            value={roleData.name}
            onChange={handleRoleChange}
            fullWidth
            margin="normal"
          />
          <div>
            {permissions.map((permission) => (
              <div key={permission.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={roleData.permissions.includes(permission.id)} // Controlled by roleData.permissions
                    onChange={() => handlePermissionToggle(permission.id)}
                  />
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRoleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRoleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Roles;
