import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { CustomChangeEvent, LocationPopupProps } from "@/types/admin";
import { useGetUnitsQuery } from "@/state/unitApi";

export const LocationPopup: React.FC<LocationPopupProps> = ({
  dialogState,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}) => {
  const { data: units, isLoading } = useGetUnitsQuery();

  const handleUnitChange = (event: SelectChangeEvent<string>) => {
    const customEvent: CustomChangeEvent = {
      name: "unit",
      value: event.target.value,
    };
    onFormChange(customEvent);
  };

  return (
    <Dialog open={dialogState.isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dialogState.type === "add" ? "Add Unit" : "Confirm Delete"}
      </DialogTitle>

      <form onSubmit={onSubmit}>
        <DialogContent>
          {dialogState.type === "delete" ? (
            <DialogContentText>
              Are you sure you want to delete {dialogState.selectedLocation?.name}? This action cannot be undone.
            </DialogContentText>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={onFormChange}
                required
                fullWidth
              />

              {/* Dropdown for Unit Selection */}
              <FormControl fullWidth>
                <InputLabel id="unit-select-label">Unit</InputLabel>
                <Select
                  labelId="unit-select-label"
                  name="unit"
                  value={formData.unit?.toString()}
                  onChange={handleUnitChange}
                  required
                  disabled={isLoading}
                >
                  {units?.map((unit) => (
                    <MenuItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          {dialogState.type === "delete" ? (
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
