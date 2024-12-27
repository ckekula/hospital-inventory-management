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
import { InventoryPopupProps } from '@/types/inventory';

export const InventoryPopup: React.FC<InventoryPopupProps> = ({
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
        {dialogState.type === 'add' ? 'Add Equipment' :
         dialogState.type === 'edit' ? 'Edit Equipment' :
         'Confirm Delete'}
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          {dialogState.type === 'delete' ? (
            <DialogContentText>
              Are you sure you want to delete {dialogState.selectedEquipment?.name}?
              This action cannot be undone.
            </DialogContentText>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Equipment Type"
                value={formData.name}
                onChange={onFormChange}
                required
                fullWidth
              />
              <TextField
                name="minStock"
                label="Minimum Stock"
                type="number"
                value={formData.minStock}
                onChange={onFormChange}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          {dialogState.type === 'delete' ? (
            <Button
              type="submit"
              color="error"
              variant="contained"
            >
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