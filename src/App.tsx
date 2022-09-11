import "./App.css";
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Card, CardContent, Typography } from "@mui/material";
import { iTodo } from "@interfaces/iTodo";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'description', headerName: 'Description', width: 500 },
];

const todoRows: iTodo[] = [
  { id: '1', isDone: false, description: "Buy banana for the monkey" },
  { id: '2', isDone: false, description: "Do oil change for Mercedes Benz" },
  { id: '3', isDone: false, description: "Finish code assessments" }
];

const initTodo = (todoRows: iTodo[]) => {
  return todoRows;
}

const todoReducer = (todoState: iTodo[], todoAction: any) => {
  switch(todoAction.type) {
    case 'add':
      return todoState;
    default:
      throw new Error();
  }
}

export default function App() {
  let initialTodo: iTodo[] = todoRows;
  const [todoState, dispatchTodo] = React.useReducer(todoReducer, initialTodo, initTodo);

  return (
    <div style={{ height: 500, width: 700, margin: 10 }}>
      <Typography variant="h2">Todo</Typography>
      <DataGrid
        rows={todoState}
        columns={columns}
        checkboxSelection
        hideFooter
        hideFooterPagination
      />
    </div>
  );
}
