import "./App.css";
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Typography } from "@mui/material";
import { iTodo } from "@interfaces/iTodo";
import { useQuery } from "react-query";

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 300 },
  { field: 'description', headerName: 'Description', width: 700 },
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
  const { isLoading, error, data: initialTodos } = useQuery('todos', async () => {
    const res = await fetch(`${window.location.origin}/todo`);
    return res.json();
  });

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Error Loading</div>
    )
  }

  console.log('todoState', initialTodos);
  // const [todoState, dispatchTodo] = React.useReducer(todoReducer, initialTodos, initTodo);

  return (
    <div style={{ height: 500, width: 700, margin: 10 }}>
      <Typography variant="h2">Todo</Typography>
      <DataGrid
        rows={initialTodos}
        columns={columns}
        checkboxSelection
        hideFooter
        hideFooterPagination
      />
    </div>
  );
}
