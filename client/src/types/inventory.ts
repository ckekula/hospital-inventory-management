export interface Equipment {
  id: number;
  name: string;
  quantity: number;
  minStock: number;
  type: 'Individual' | 'Bulk';

}

export interface FormData {
  name: string;
  minStock: string;
  type: 'Individual' | 'Bulk';
  quantity: string;
}

export type PopupType = 'add' | 'edit' | 'delete' | null;

export type PopupState = {
  type: 'add' | 'edit' | 'delete' | null;
  isOpen: boolean;
  selectedEquipment: Equipment | null;
};

export interface InventoryPopupProps {
  dialogState: PopupState;
  formData: FormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InventoryTableProps {
  equipment: Equipment[];
  onEdit: (equipment: Equipment) => void;
  onDelete: (equipment: Equipment) => void;
}