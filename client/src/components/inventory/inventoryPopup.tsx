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
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { InventoryPopupProps } from '@/types/inventory';

export const InventoryPopup: React.FC<InventoryPopupProps> = ({
  dialogState,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  const handleTypeChange = (event: SelectChangeEvent<'Individual' | 'Bulk'>) => {
    onFormChange({
      target: { name: 'type', value: event.target.value as 'Individual' | 'Bulk' }
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
                label="Name"
                value={formData.name}
                onChange={onFormChange}
                required
                fullWidth
              />
              
              {dialogState.type === 'add' ? (
                <FormControl fullWidth>
                  <InputLabel id="type-select-label">Type</InputLabel>
                  <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={formData.type}
                    label="Type"
                    onChange={handleTypeChange}
                  >
                    <MenuItem value="Individual">Individual</MenuItem>
                    <MenuItem value="Bulk">Bulk</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    Type: {formData.type === 'Individual' ? 'Individual' : 'Bulk'}
                  </Typography>
                </Box>
              )}
              
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