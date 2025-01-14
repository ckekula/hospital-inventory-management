import React from 'react';
import { Box } from '@mui/material';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/state/userApi';
import { User } from '@/types/admin';
import UserTable from './UserTable';
import { useUserForm } from './useUserForm';
import { UserPopup } from './UserPopup';
import { Error, Loading } from '@/components/shared/LoadingAndError';

export const UserSection: React.FC = () => {
  const { data: users = [], isError, isLoading } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange,
  } = useUserForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (dialogState.type === 'edit' && dialogState.selectedUser) {
        await updateUser({
          id: dialogState.selectedUser.id,
          data: formData,
        }).unwrap();
      } else if (dialogState.type === 'delete' && dialogState.selectedUser) {
        await deleteUser(dialogState.selectedUser.id).unwrap();
      }
      handleDialogClose();
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error message="Failed to fetch users" />;

  return (
    <Box>
      <UserTable
        users={users}
        onEdit={(user: User) => handleDialogOpen('edit', user)}
        onDelete={(user: User) => handleDialogOpen('delete', user)}
      />

      <UserPopup
        dialogState={dialogState}
        formData={formData}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
        onFormChange={handleFormChange}
      />
    </Box>
  );
};