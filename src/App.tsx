import "./App.css";
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 300 },
  { field: 'description', headerName: 'Description', width: 700 },
];

const todoGet = async () => {
  const res = await fetch(`${window.location.origin}/todo`);
  return res.json();
};

const todoPost = async (newTodo: string) => {
  const body = JSON.stringify({ description: newTodo });
  const res = await fetch(`${window.location.origin}/todo`, { method: 'POST', body });
  return res.json();
};

export default function App() {
  const [newTodo, setNewTodo] = React.useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(true);
  const queryClient = useQueryClient();

  const todoGetQuery = useQuery('todos', todoGet);
  const todoCreateMutation = useMutation(todoPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      setIsSnackbarOpen(true);
    }
  });

  if (todoGetQuery.isLoading || todoCreateMutation.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (todoGetQuery.error) {
    return (
      <div>Error Loading</div>
    )
  }

  const todoList = todoGetQuery.data;
  const onNewTodoChange = (e: any) => setNewTodo(e.target.value);
  const handleTodoSubmit = (e: any) => {
    e.preventDefault();
    if (newTodo) {
      todoCreateMutation.mutate(newTodo);
      setNewTodo("");
    }
  };

  return (
    <div style={{ height: 500, width: 700, margin: 10 }}>
      <Typography variant="h2">Todo</Typography>
      <div style={{ padding: '10px 0'}}>
        <form onSubmit={handleTodoSubmit}>
          <TextField
            id="new-todo-text"
            onChange={onNewTodoChange}
            label="Add Todo"
            variant="outlined"
            fullWidth
            InputProps={{endAdornment: <Button type="submit" variant="contained">Add</Button>}}
          />
        </form>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
        onClose={() => setIsSnackbarOpen(false)}
        >
        <Alert severity="success">Successfully added or loaded Todo!</Alert>
      </Snackbar>
      <DataGrid
        rows={todoList}
        columns={columns}
        checkboxSelection
        hideFooter
        hideFooterPagination
      />
    </div>
  );
}
