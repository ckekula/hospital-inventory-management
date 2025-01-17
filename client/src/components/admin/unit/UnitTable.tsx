import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { UnitTableProps } from '@/types/admin';
import { IconButton, Paper, Box } from '@mui/material';

const UnitTable: React.FC<UnitTableProps> = ({
  unit,
  onEdit,
  onDelete
}) => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200
    },
    {
      field: "head",
      headerName: "Head",
      flex: 1,
      minWidth: 200
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
  ]
  
  return (
    <Paper elevation={2}>
      <DataGrid
        rows={unit}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
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
}

export default UnitTable