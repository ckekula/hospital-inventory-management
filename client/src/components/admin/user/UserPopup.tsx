import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  DialogContentText,
  Box,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { UserPopupProps } from '@/types/admin';

const AVAILABLE_ROLES = ['hims-admin', 'hims-user'];

export const UserPopup: React.FC<UserPopupProps> = ({
  dialogState,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string[]>) => {
    onFormChange({
      target: {
        name: 'roles',
        value: event.target.value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
      {dialogState.type === 'add' ? 'Add User' :
         dialogState.type === 'edit' ? 'Edit User' :
         'Confirm Delete'}
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          {dialogState.type === 'delete' ? (
            <DialogContentText>
              Are you sure you want to delete {dialogState.selectedUser?.username}?
              This action cannot be undone.
            </DialogContentText>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={onFormChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onFormChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={onFormChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={onFormChange}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.enabled}
                      onChange={onFormChange}
                      name="enabled"
                    />
                  }
                  label="Account Enabled"
                />
              </DialogContent>

              <FormControl fullWidth margin="dense">
                <InputLabel>Roles</InputLabel>
                <Select
                  multiple
                  value={formData.roles || []}
                  onChange={handleRoleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {AVAILABLE_ROLES.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          {dialogState.type === 'delete' ? (
            <Button type="submit" color="error" variant="contained">
              Delete
            </Button>
          ) : (
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              {dialogState.type === 'add' ? 'Add' : 'Update'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};