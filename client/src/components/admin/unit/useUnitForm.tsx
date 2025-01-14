'use client';

import { useState } from 'react';
import { UnitFormData, UnitPopupState, Unit } from "@/types/admin";

export const useUnitForm = () => {
  const [dialogState, setDialogState] = useState<UnitPopupState>({
    type: null,
    isOpen: false,
    selectedUnit: null
  });

  const [formData, setFormData] = useState<UnitFormData>({
    name: "",
    head: ""
  });

  const handleDialogOpen = (type: UnitPopupState['type'], unit: Unit | null = null) => {
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

  return {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange
  };
};