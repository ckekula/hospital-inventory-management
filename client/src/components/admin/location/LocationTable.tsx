'use client'
import React from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Delete as DeleteIcon } from '@mui/icons-material';
import { IconButton, Paper, Box } from '@mui/material';
import { LocationTableProps, Location } from '@/types/admin';

const LocationTable: React.FC<LocationTableProps> = ({
  location,
  onDelete
}) => {
  const columns: GridColDef<Location>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 200
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        console.log('Render cell params:', params);
        return params.row?.unit?.name ?? 'N/A';
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Location>) => (
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
      <DataGrid<Location>
        rows={location}
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

export default LocationTable;