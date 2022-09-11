import "./App.css";
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from "@mui/material";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'description', headerName: 'Description', width: 500 },
];

const rows = [
  { id: 1, isDone: false, description: "Buy banana for the monkey" },
  { id: 2, isDone: false, description: "Do oil change for Mercedes Benz" },
  { id: 3, isDone: false, description: "Finish code assessment" }
];

export default function App() {
  return (
    <div style={{ height: 500, width: 700, margin: 10 }}>
      <Typography variant="h2">Todo</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        hideFooter
        hideFooterPagination
      />
    </div>
  );
}
