import React from "react";
import { Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useGetEquipmentQuery, useAddEquipmentMutation, useUpdateEquipmentMutation, useDeleteEquipmentMutation } from "@/state/equipmentApi";
import { Equipment } from "@/types/inventory";
import InventoryTable from "./inventoryTable";
import { InventoryPopup } from "./inventoryPopup";
import { useInventoryForm } from "./useInventoryForm";
import { Loading } from "@/components/shared/LoadingAndError";
import { Error } from "@/components/shared/LoadingAndError";

export const InventorySection: React.FC = () => {
  const { data: equipment = [], isError, isLoading } = useGetEquipmentQuery();
  const [addEquipment] = useAddEquipmentMutation();
  const [updateEquipment] = useUpdateEquipmentMutation();
  const [deleteEquipment] = useDeleteEquipmentMutation();

  const {
    dialogState,
    formData,
    handleDialogOpen,
    handleDialogClose,
    handleFormChange,
  } = useInventoryForm();

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

  if (isLoading) return <Loading />;
  if (isError) return <Error message="Failed to fetch inventory items" />;

  return (
    <Box>
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