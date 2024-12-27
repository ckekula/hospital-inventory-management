import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Box, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { InventoryTableProps } from '@/types/inventory';

export const InventoryTable: React.FC<InventoryTableProps> = ({
  equipment,
  onEdit,
  onDelete,
}) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Equipment Type",
      flex: 1,
      minWidth: 200
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      minWidth: 150,
      type: "number"
    },
    {
      field: "minStock",
      headerName: "Min Stock",
      flex: 1,
      minWidth: 150,
      type: "number"
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => onEdit(params.row)}
            size="small"
            color="primary"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => onDelete(params.row)}
            size="small"
            color="error"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Paper elevation={2}>
      <DataGrid
        rows={equipment}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 }
          }
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: 1,
            borderColor: 'divider'
          }
        }}
      />
    </Paper>
  );
};