"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Header from "@/components/shared/header";
import { useAddUnitMutation, useDeleteUnitMutation, useGetUnitsQuery, useUpdateUnitMutation } from "@/state/api";
import { FormData, PopupState, Unit } from "@/types/admin";
import UnitTable from "@/components/admin/UnitTable";
import { UnitPopup } from "@/components/admin/UnitPopup";

const Admin: React.FC = () => {
  const { data: unit = [], isError, isLoading } = useGetUnitsQuery();
  const [addUnit] = useAddUnitMutation();
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  const [dialogState, setDialogState] = useState<PopupState>({
    type: null,
    isOpen: false,
    selectedUnit: null
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    head: ""
  });

  const handleDialogOpen = (type: PopupState['type'], unit: Unit | null = null) => {
    setDialogState({
      type,
      isOpen: true,
      selectedUnit: unit
    });
  
    if (unit) {
      setFormData({
        name: unit.name,
        head: unit.head
      });
    } else {
      setFormData({
        name: "",
        head: ""
      });
    }
  };
  
  const handleDialogClose = () => {
    setDialogState({
      type: null,
      isOpen: false,
      selectedUnit: null
    });
    setFormData({
      name: "",
      head: ""
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
  }
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        Loading...
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" color="error.main">
        Failed to fetch units
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Header name="Unit" />
      
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

export default Admin;