export interface Item {
    id: number;
    name: string;
    equipment: string;
    manufacturer: string;
    modelNo: string;
    serialNo: string;
    assignedUnit: string;
    assignedDate: string;
    purchasedDate: string;
    expDate: string;
    warrantyExpDate: string;
    maintenancePeriod: number;
    cost: string;
    fundingSource: string;
    status: 'Active' | 'Inactive';
    currentLocation: string;
}