import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React from 'react'
import { Delete as DeleteIcon } from '@mui/icons-material';
import { UnitTableProps } from '@/types/admin';
import { Box } from 'lucide-react';
import { IconButton, Paper } from '@mui/material';

const UnitTable: React.FC<UnitTableProps> = ({
  unit,
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
}

export default UnitTable