export interface Unit {
    id: string;
    name: string;
    head: string;
}

export interface UnitTableProps {
  unit: Unit[];
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
}

export interface UnitFormData {
  name: string;
  head: string;
}

export type UnitPopupState = {
  type: 'add' | 'edit' | 'delete' | null;
  isOpen: boolean;
  selectedUnit: Unit | null;
};

export interface UnitPopupProps {
  dialogState: UnitPopupState;
  formData: UnitFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Location {
  id: string;
  name: string;
  unit: string;
}

export interface LocationTableProps {
  location: Location[];
  onDelete: (location: Location) => void;
}

export interface LocationFormData {
  name: string;
  unit: string;
}

export type LocationPopupState = {
  type: 'add' | 'delete' | null;
  isOpen: boolean;
  selectedLocation: Location | null;
};

export interface LocationPopupProps {
  dialogState: LocationPopupState;
  formData: LocationFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}