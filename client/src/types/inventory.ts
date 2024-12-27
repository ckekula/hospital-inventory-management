export interface EquipmentType {
    id: string;
    name: string;
    quantity: number;
    minStock: number;
    created_date: string;
    updated_date: string;
}

export interface FormData {
    name: string;
    minStock: string;
}

export type PopupType = 'add' | 'edit' | 'delete' | null;

export interface PopupState {
    type: 'add' | 'edit' | 'delete' | null;
    isOpen: boolean;
    selectedEquipment: {
      id: string;
      name: string;
      minStock: number;
    } | null;
}

export interface InventoryPopupProps {
  dialogState: PopupState;
  formData: FormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InventoryTableProps {
  equipment: EquipmentType[];
  onEdit: (equipment: EquipmentType) => void;
  onDelete: (equipment: EquipmentType) => void;
}