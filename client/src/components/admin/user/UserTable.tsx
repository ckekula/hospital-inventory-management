import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { UserTableProps } from '@/types/admin';

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>
                <Chip 
                  label={user.enabled ? "Active" : "Disabled"}
                  color={user.enabled ? "success" : "error"}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {new Date(user.createdTimestamp).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {user.roles?.map((role) => (
                    <Chip
                      key={role}
                      label={role}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(user)} size="small">
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => onEdit(user)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(user)} size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;