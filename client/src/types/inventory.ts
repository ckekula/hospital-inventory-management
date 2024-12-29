export interface Equipment {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
  type: 'INDIVIDUAL' | 'BULK';

}

export interface FormData {
  name: string;
  minStock: string;
  type: 'INDIVIDUAL' | 'BULK';
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