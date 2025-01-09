'use client';

import { useState } from 'react';
import { LocationFormData, LocationPopupState, Location, FormChangeEvent } from "@/types/admin";

export const LocationForm = () => {
  const [dialogState, setDialogState] = useState<LocationPopupState>({
    type: null,
    isOpen: false,
    selectedLocation: null
  });

  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    unit: ""
  });

  const handleDialogOpen = (type: LocationPopupState['type'], location: Location | null = null) => {
    setDialogState({
      type,
      isOpen: true,
      selectedLocation: location
    });
  
    if (location) {
      setFormData({
        name: location.name,
        unit: location.unit?.id || ""
      });
    } else {
      setFormData({
        name: "",
        unit: ""
      });
    }
  };
  
  const handleDialogClose = () => {
    setDialogState({
      type: null,
      isOpen: false,
      selectedLocation: null
    });
    setFormData({
      name: "",
      unit: ""
    });
  };

  const handleFormChange = (e: FormChangeEvent) => {
    const name = 'target' in e ? e.target.name : e.name;
    const value = 'target' in e ? e.target.value : e.value;
    
    setFormData(prev => ({
      ...prev,
      [name]: value as string
    }));
  }

  return {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange
  };
};