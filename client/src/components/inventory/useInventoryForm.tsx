'use client';

import { useState } from 'react';
import { PopupState, FormData, Equipment } from '@/types/inventory';

export const useInventoryForm = () => {
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

  return {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange,
  };
};