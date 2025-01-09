import React from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useAddLocationMutation, useDeleteLocationMutation, useGetLocationsQuery } from "@/state/locationApi";
import { LocationForm } from "./useLocationForm";
import LocationTable from "./LocationTable";
import { LocationPopup } from "./LocationPopup";
import { AddLocationRequest, Location } from "@/types/admin";

export const LocationSection: React.FC = () => {
  const { data: locations = [] as Location[]} = useGetLocationsQuery();
  const [addLocation] = useAddLocationMutation();
  const [deleteLocation] = useDeleteLocationMutation();

  const {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange
  } = LocationForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const locationData: AddLocationRequest = {
      name: formData.name,
      unit: {
        id: formData.unit
      }
    };

    try {
      if (dialogState.type === 'add') {
        await addLocation(locationData).unwrap();
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
        location={locations as Location[]}
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
