import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { LocationPopupProps } from '@/types/admin'; 

export const LocationPopup: React.FC<LocationPopupProps> = ({
  dialogState,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  return (
    <Dialog
      open={dialogState.isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
      {dialogState.type === 'add' ? 'Add Unit' :
         'Confirm Delete'}
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          {dialogState.type === 'delete' ? (
            <DialogContentText>
              Are you sure you want to delete {dialogState.selectedLocation?.name}?
              This action cannot be undone.
            </DialogContentText>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={onFormChange}
                required
                fullWidth
              />

              <TextField
                name="unit"
                label="Unit"
                type="number"
                value={formData.unit}
                onChange={onFormChange}
                required
                fullWidth
              />
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
              Add
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
