export interface Unit {
    id: string;
    name: string;
    head: string;
}

export interface UnitTableProps {
  unit: Unit[];
  onDelete: (unit: Unit) => void;
}

export interface FormData {
  name: string;
  head: string;
}

export type PopupState = {
  type: 'add' | 'delete' | null;
  isOpen: boolean;
  selectedUnit: Unit | null;
};

export interface UnitPopupProps {
  dialogState: PopupState;
  formData: FormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}