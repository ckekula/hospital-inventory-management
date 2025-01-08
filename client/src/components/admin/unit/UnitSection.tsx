import React from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useAddUnitMutation, useDeleteUnitMutation, useGetUnitsQuery, useUpdateUnitMutation } from "@/state/unitApi";
import { Unit } from "@/types/admin";
import UnitTable from "./UnitTable";
import { UnitPopup } from "./UnitPopup";
import { UnitForm } from "./useUnitForm";

export const UnitSection: React.FC = () => {
  const { data: unit = [] } = useGetUnitsQuery();
  const [addUnit] = useAddUnitMutation();
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  const {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange
  } = UnitForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericFormData = {
      name: formData.name,
      head: formData.head
    };

    try {
      if (dialogState.type === 'add') {
        await addUnit(numericFormData).unwrap();
      } else if (dialogState.type === 'edit' && dialogState.selectedUnit){
        await updateUnit({
          id: dialogState.selectedUnit.id,
          data: numericFormData
        }).unwrap();
      } else if (dialogState.type === 'delete' && dialogState.selectedUnit) {
        await deleteUnit(dialogState.selectedUnit.id).unwrap();
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
          Add Unit
        </Button>
      </Box>

      <UnitTable
        unit={unit}
        onEdit={(unit: Unit) => handleDialogOpen('edit', unit)}
        onDelete={(unit: Unit) => handleDialogOpen('delete', unit)}
      />

      <UnitPopup
        dialogState={dialogState}
        formData={formData}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />
    </Box>
  );
};