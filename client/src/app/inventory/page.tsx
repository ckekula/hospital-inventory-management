"use client";

import Header from "@/components/shared/header";
import {useGetEquipmentTypesQuery} from "@/state/api";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {field: "id", headerName: "ID", width: 90},
  {field: "name", headerName: "Equipment Type", width: 200},
  {
    field: "quantity",
    headerName: "Quantity",
    width: 110,
    type: "number",
  },
  {
    field: "minStock",
    headerName: "Minimum Stock",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const {data: equipmentType, isError, isLoading} = useGetEquipmentTypesQuery();

  console.log(equipmentType);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !equipmentType) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch Inventory items
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={equipmentType}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;
