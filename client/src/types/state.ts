interface EquipmentType {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
}

export type EquipmentTypes = EquipmentType[];
