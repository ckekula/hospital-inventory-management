'use client';

import { useState } from 'react';
import { LocationFormData, LocationPopupState, Location } from "@/types/admin";

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
        unit: location.unit
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