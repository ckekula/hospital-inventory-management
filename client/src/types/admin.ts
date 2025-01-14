export interface Unit {
    id: number;
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
  id: number;
  name: string;
  unit: Unit | null;
}

export interface LocationFormData {
  name: string;
  unit: number | null; // Store the unit ID
}

export interface LocationTableProps {
  location: Location[];
  onDelete: (location: Location) => void;
}

export type LocationPopupState = {
  type: 'add' | 'delete' | null;
  isOpen: boolean;
  selectedLocation: Location | null;
}

export interface CustomChangeEvent {
  name: string;
  value: unknown;
}

export type FormChangeEvent = 
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | CustomChangeEvent;

export interface LocationPopupProps {
  dialogState: LocationPopupState;
  formData: LocationFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onFormChange: (e: FormChangeEvent) => void;
}

export interface AddLocationRequest {
  name: string;
  unit: {
    id: number | null;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  createdTimestamp: number;
  roles: string[];
}


export interface UserFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  roles: string[];
}

export interface UserDialogState {
  type: 'add' | 'edit' | 'delete' | null;
  isOpen: boolean;
  selectedUser: User | null;
}

export interface UserPopupProps {
  dialogState: UserDialogState;
  formData: UserFormData;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserTableProps {
  users: User[];
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}