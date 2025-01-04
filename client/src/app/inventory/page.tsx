"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import Header from "@/components/shared/header";
import { useGetEquipmentQuery, useAddEquipmentMutation, useUpdateEquipmentMutation, useDeleteEquipmentMutation } from "@/state/api";
import { PopupState, FormData, Equipment } from "@/types/inventory";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryPopup } from "@/components/inventory/InventoryPopup";

const Inventory: React.FC = () => {
  const { data: equipment = [], isError, isLoading } = useGetEquipmentQuery();
  const [addEquipment] = useAddEquipmentMutation();
  const [updateEquipment] = useUpdateEquipmentMutation();
  const [deleteEquipment] = useDeleteEquipmentMutation();

  const [dialogState, setDialogState] = useState<PopupState>({
    type: null,
    isOpen: false,
    selectedEquipment: null
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    minStock: "",
    type: "Individual",
    quantity: "0"
  });

  const handleDialogOpen = (type: PopupState['type'], equipment: Equipment | null = null) => {
    setDialogState({
      type,
      isOpen: true,
      selectedEquipment: equipment
    });
  
    if (equipment) {
      setFormData({
        name: equipment.name,
        minStock: equipment.minStock.toString(),
        type: equipment.type || 'Individual',
        quantity: equipment.quantity?.toString() || '0'
      });
    } else {
      setFormData({
        name: "",
        minStock: "",
        type: "Individual",
        quantity: "0"
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
      minStock: "",
      type: "Individual",
      quantity: "0"
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
      quantity: formData.type === 'Bulk' ? parseInt(formData.quantity || '0') : 0,
      minStock: parseInt(formData.minStock),
      type: formData.type || 'Individual'
    };
  
    try {
      if (dialogState.type === 'add') {
        await addEquipment(numericFormData).unwrap();
      } else if (dialogState.type === 'edit' && dialogState.selectedEquipment) {
        await updateEquipment({
          id: dialogState.selectedEquipment.id,
          data: numericFormData
        }).unwrap();
      } else if (dialogState.type === 'delete' && dialogState.selectedEquipment) {
        await deleteEquipment(dialogState.selectedEquipment.id).unwrap();
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
          Add Equipment
        </Button>
      </Box>

      <InventoryTable
        equipment={equipment}
        onEdit={(equipment: Equipment) => handleDialogOpen('edit', equipment)}
        onDelete={(equipment: Equipment) => handleDialogOpen('delete', equipment)}
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