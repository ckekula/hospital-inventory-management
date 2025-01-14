import React from 'react';
import { Box, Button } from '@mui/material';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, useAddUserMutation, useAssignUserRoleMutation, useRemoveUserRoleMutation } from '@/state/userApi';
import { User } from '@/types/admin';
import UserTable from './UserTable';
import { useUserForm } from './useUserForm';
import { UserPopup } from './UserPopup';
import { Error, Loading } from '@/components/shared/LoadingAndError';
import { Add as AddIcon } from "@mui/icons-material";

export const UserSection: React.FC = () => {
  const { data: users = [], isError, isLoading } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [assignRole] = useAssignUserRoleMutation();
  const [removeRole] = useRemoveUserRoleMutation();

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
      if (dialogState.type === 'add') {
        const newUser = await addUser(formData).unwrap();
        // Assign selected roles
        for (const role of formData.roles) {
          await assignRole({ userId: newUser.id, role }).unwrap();
        }
      } else if (dialogState.type === 'edit' && dialogState.selectedUser) {
        await updateUser({
          id: dialogState.selectedUser.id,
          data: formData,
        }).unwrap();

        // Handle role changes
        const oldRoles = dialogState.selectedUser.roles || [];
        const newRoles = formData.roles || [];

        // Remove roles that are no longer selected
        for (const role of oldRoles) {
          if (!newRoles.includes(role)) {
            await removeRole({ 
              userId: dialogState.selectedUser.id, 
              role 
            }).unwrap();
          }
        }

        // Add newly selected roles
        for (const role of newRoles) {
          if (!oldRoles.includes(role)) {
            await assignRole({ 
              userId: dialogState.selectedUser.id, 
              role 
            }).unwrap();
          }
        }
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleDialogOpen('add')}
        >
          Add User
        </Button>
      </Box>

      <UserTable
        users={users}
        onAdd={() => handleDialogOpen('add')}
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