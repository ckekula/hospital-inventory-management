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
} from '@mui/material';
import { UserDialogState, UserFormData } from '@/types/admin';

interface UserPopupProps {
  dialogState: UserDialogState;
  formData: UserFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UserPopup: React.FC<UserPopupProps> = ({
  dialogState,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  const isEdit = dialogState.type === 'edit';
  const isDelete = dialogState.type === 'delete';

  if (!dialogState.isOpen) return null;

  if (isDelete) {
    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete user {dialogState.selectedUser?.username}?
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>{isEdit ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            name="username"
            value={formData.username}
            onChange={onFormChange}
            fullWidth
            disabled={isEdit}
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
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};