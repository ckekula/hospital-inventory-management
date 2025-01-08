import React from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useAddLocationMutation, useDeleteLocationMutation, useGetLocationsQuery } from "@/state/locationApi";
import { LocationForm } from "./LocationForm";
import LocationTable from "./LocationTable";
import { LocationPopup } from "./LocationPopup";
import { Location } from "@/types/admin";

export const LocationSection: React.FC = () => {
  const { data: location = [] } = useGetLocationsQuery();
  const [addLocation] = useAddLocationMutation();
  const [deleteLocation] = useDeleteLocationMutation();

  const {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange
  } = LocationForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericFormData = {
      name: formData.name,
      unit: formData.unit
    };

    try {
      if (dialogState.type === 'add') {
        await addLocation(numericFormData).unwrap();
      } else if (dialogState.type === 'delete' && dialogState.selectedLocation) {
        await deleteLocation(dialogState.selectedLocation.id).unwrap();
      }
      handleDialogClose();
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen('add')}
        >
          Add Location
        </Button>
      </Box>

      <LocationTable
        location={location}
        onDelete={(location: Location) => handleDialogOpen('delete', location)}
      />

      <LocationPopup
        dialogState={dialogState}
        formData={formData}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />
    </Box>
  );
};