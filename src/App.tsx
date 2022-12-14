import "./App.css";
import * as React from 'react';
import { DataGrid, GridColDef, GridRenderEditCellParams, selectedGridRowsCountSelector, useGridApiContext } from '@mui/x-data-grid';
import { Alert, Button, OutlinedInput, Snackbar, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { iTodo } from "@interfaces/iTodo";

const todoGet = async () => {
  const res = await fetch(`${window.location.origin}/todo`, { method: 'GET' });
  return res.json();
};

const todoPost = async (newTodo: string) => {
  const body = JSON.stringify({ description: newTodo });
  const res = await fetch(`${window.location.origin}/todo`, { method: 'POST', body });
  return res.json();
};

const todoPutDescription = async (todoParams: any) => {
  const { id: todoId, description } = todoParams;
  const body = JSON.stringify({ description });
  const res = await fetch(`${window.location.origin}/todo/${todoId}`, { method: 'PUT', body });
  return res.json();
};

const todoPutIsDone = async (todoParams: any) => {
  const { id: todoId, isDone } = todoParams;
  const body = JSON.stringify({ isDone });
  const res = await fetch(`${window.location.origin}/todo/${todoId}`, { method: 'PUT', body });
  return res.json();
};

const todoDelete = async (todoId: string) => {
  const res = await fetch(`${window.location.origin}/todo/${todoId}`, { method: 'DELETE' });
  return res.json();
};

function CustomEditDescriptionComponent(props: GridRenderEditCellParams) {
  const queryClient = useQueryClient();
  const apiRef = useGridApiContext();
  const todoPutDescriptionMutation = useMutation(todoPutDescription, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const { id, formattedValue: previousDescription } = props;
  const [updatedDescription, setUpdatedDescription] = React.useState(props.formattedValue);
  const onNewTodoChange = (e: any) => setUpdatedDescription(e.target.value);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const field = 'description';
    if (previousDescription !== updatedDescription) {
      todoPutDescriptionMutation.mutate({ id, description: updatedDescription });
      apiRef.current.setEditCellValue({
        id,
        value: updatedDescription,
        field,
      });
      apiRef.current.stopCellEditMode({ id, field});
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <OutlinedInput
        id="new-todo-text"
        onChange={onNewTodoChange}
        value={updatedDescription}
        fullWidth
        endAdornment={<Button type="submit" variant="contained">Update</Button>}
      />
    </form>
  );
}

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 300 },
  { field: 'description', headerName: 'Description', width: 700, editable: true,
    renderEditCell: (params: GridRenderEditCellParams) => {
      return <CustomEditDescriptionComponent {...params} />;
    }
  },
  { field: 'action', headerName: 'Action', width: 100,
    renderCell: (params) => {
      const queryClient = useQueryClient();
      const todoDeleteMutation = useMutation(todoDelete, {
        onSuccess: () => {
          queryClient.invalidateQueries(['todos']);
        }
      });
      const onClick = (e: any) => {
        e.stopPropagation();
        const todoId = String(params.id);
        todoDeleteMutation.mutate(todoId)
      };
      return (
        <div>
          <Typography variant="body1">{params.formattedValue}</Typography>
          <Button onClick={onClick} variant="outlined">Delete</Button>
        </div>
      );
    }
  },
];


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
  const todoPutIsDoneMutation = useMutation(todoPutIsDone, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  if (todoGetQuery.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (todoGetQuery.error) {
    return (
      <div>Error Loading</div>
    )
  }

  const allTodos = todoGetQuery.data;
  const dbSelectedTodoIds = allTodos
    .filter((todo: iTodo) => todo.isDone)
    .map((todo: iTodo) => todo.id);

  const onNewTodoChange = (e: any) => setNewTodo(e.target.value);
  const handleTodoSubmit = (e: any) => {
    e.preventDefault();
    if (newTodo) {
      todoCreateMutation.mutate(newTodo);
      setNewTodo("");
    }
  };

  const onSelectionModelChange = (selectedTodoIds: string[]) => {
    selectedTodoIds
      .filter((selectedTodoId) => !dbSelectedTodoIds.includes(selectedTodoId))
      .forEach((selectedTodoId) => todoPutIsDoneMutation.mutate({ id: selectedTodoId, isDone: true }));

    dbSelectedTodoIds
      .filter((dbSelectedTodoId: string) => !selectedTodoIds.includes(dbSelectedTodoId))
      .forEach((dbSelectedTodoId: string) => todoPutIsDoneMutation.mutate({ id: dbSelectedTodoId, isDone: false }))
  }

  return (
    <div style={{ height: 500, width: 900, margin: 10 }}>
      <Typography variant="h2">Todo</Typography>
      <div style={{ padding: '10px 0'}}>
        <form onSubmit={handleTodoSubmit}>
          <TextField
            id="new-todo-text"
            onChange={onNewTodoChange}
            label="Add Todo"
            variant="outlined"
            value={newTodo}
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
        rows={allTodos}
        columns={columns}
        onSelectionModelChange={onSelectionModelChange}
        selectionModel={dbSelectedTodoIds}
        checkboxSelection
        hideFooter
        hideFooterPagination
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
}
