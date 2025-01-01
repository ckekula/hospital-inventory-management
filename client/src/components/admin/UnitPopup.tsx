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
import { UnitPopupProps } from '@/types/admin';

export const UnitPopup: React.FC<UnitPopupProps> = ({
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
        {dialogState.type === 'add' ? 'Add Equipment' : 'Confirm Delete'}
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          {dialogState.type === 'delete' ? (
            <DialogContentText>
              Are you sure you want to delete {dialogState.selectedUnit?.name}?
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
                name="quantity"
                label="Quantity"
                type="number"
                value={formData.head}
                onChange={onFormChange}
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
            <Button type="submit" color="primary" variant="contained">
              Add
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
