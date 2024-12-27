"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Header from "@/components/shared/header";
import { InventoryPopup } from "@/components/inventory/inventoryPopup";
import { InventoryTable } from "@/components/inventory/inventoryTable";
import { useGetEquipmentTypesQuery, useAddEquipmentTypeMutation, useUpdateEquipmentTypeMutation, useDeleteEquipmentTypeMutation } from "@/state/api";
import { PopupState, FormData, EquipmentType } from "@/types/inventory";

const Inventory: React.FC = () => {
  const { data: equipmentTypes = [], isError, isLoading } = useGetEquipmentTypesQuery();
  const [addEquipmentType] = useAddEquipmentTypeMutation();
  const [updateEquipmentType] = useUpdateEquipmentTypeMutation();
  const [deleteEquipmentType] = useDeleteEquipmentTypeMutation();

  const [dialogState, setDialogState] = useState<PopupState>({
    type: null,
    isOpen: false,
    selectedEquipment: null
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    minStock: ""
  });

  const handleDialogOpen = (type: PopupState['type'], equipment: EquipmentType | null = null) => {
    setDialogState({
      type,
      isOpen: true,
      selectedEquipment: equipment
    });

    if (equipment) {
      setFormData({
        name: equipment.name,
        minStock: equipment.minStock.toString()
      });
    } else {
      setFormData({
        name: "",
        minStock: ""
      });
    }
  };

  const handleDialogClose = () => {
    setDialogState({
      type: null,
      isOpen: false,
      selectedEquipment: null
    });
    setFormData({
      name: "",
      minStock: ""
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
      quantity: 0,
      minStock: parseInt(formData.minStock)
    };
  
    try {
      if (dialogState.type === 'add') {
        await addEquipmentType(numericFormData).unwrap();
      } else if (dialogState.type === 'edit' && dialogState.selectedEquipment) {
        await updateEquipmentType({
          id: dialogState.selectedEquipment.id,
          data: numericFormData
        }).unwrap();
      } else if (dialogState.type === 'delete' && dialogState.selectedEquipment) {
        await deleteEquipmentType(dialogState.selectedEquipment.id).unwrap();
      }
      handleDialogClose();
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };
  
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
        Failed to fetch inventory items
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Header name="Inventory" />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen('add')}
        >
          Add Equipment Type
        </Button>
      </Box>

      <InventoryTable
        equipment={equipmentTypes}
        onEdit={(equipment: EquipmentType) => handleDialogOpen('edit', equipment)}
        onDelete={(equipment: EquipmentType) => handleDialogOpen('delete', equipment)}
      />

      <InventoryPopup
        dialogState={dialogState}
        formData={formData}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />
    </Box>
  );
};

export default Inventory;