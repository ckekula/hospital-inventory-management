import { GridColDef } from '@mui/x-data-grid'
import React from 'react'

const LocationTable: React.FC = () => {
  const columns: GridColDef[] = [
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
      minWidth: 200
    }
  ]

  return (
    <div>LocationTable</div>
  )
}

export default LocationTable