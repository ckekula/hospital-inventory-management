import { useState } from 'react';
import { User, UserDialogState, UserFormData } from '@/types/admin';

export const useUserForm = () => {
  const [dialogState, setDialogState] = useState<UserDialogState>({
    type: null,
    isOpen: false,
    selectedUser: null,
  });

  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    enabled: true,
  });

  const handleDialogOpen = (type: UserDialogState['type'], user: User | null = null) => {
    setDialogState({
      type,
      isOpen: true,
      selectedUser: user,
    });

    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        enabled: user.enabled,
      });
    }
  };

  const handleDialogClose = () => {
    setDialogState({
      type: null,
      isOpen: false,
      selectedUser: null,
    });
    setFormData({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      enabled: true,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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