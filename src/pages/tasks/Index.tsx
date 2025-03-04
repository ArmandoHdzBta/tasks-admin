import { Box, Button, Chip, Typography } from "@mui/material";
import TaskNavigation from "./components/TaskNavigation";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthProvider";
import ActionsTableComponent from "./components/ActionsTableComponent";
import { NavLink } from "react-router";

export default function Index() {
    const columns: GridColDef<(typeof rows)[]>[] = [
      {
        field: "id",
        headerName: "ID",
        width: 90,
      },
      {
        field: "name",
        headerName: "Title",
        width: 150,
      },
      {
        field: "description",
        headerName: "Description",
        width: 150,
      },
      {
        field: "completed",
        headerName: "Completed",
        width: 150,
        renderCell: (params: GridRenderCellParams<any, string>) => (
          <Chip label={params.row.completed ? "Completed" : "Uncompleted" } color={params.row.completed ? "success" : "default"} variant="outlined" />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 200,
        filterable: false,
        hideable: false,
        sortable: false,
        renderCell: (id: GridRenderCellParams<any, string>) => (
          <ActionsTableComponent
            id={id.row.id}
            onDelete={() => onDeleteTask(id.row.id)}
          />
        ),
      },
    ];

    const [rows, setRows] = useState();

    const auth = useAuth();
    
    const fetchTasks = async () => {
      const URL = import.meta.env.VITE_URL_BACKEND;

      await axios.get(`${URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${auth.getToken()}`
          }
      })
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setRows(data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    useEffect(() => {
      fetchTasks();
    }, []);

    const onDeleteTask = async (id: number) => {
      const URL = import.meta.env.VITE_URL_BACKEND;

      await axios
        .delete(`${URL}/tasks/${id}`)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          fetchTasks();
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          console.log("Task deleted");
        });
    };

    return (
      <div>
        <TaskNavigation>
          <Typography sx={{ color: "text.primary" }}>Index</Typography>
        </TaskNavigation>

        <Button component={NavLink} variant="outlined" to="/task/new">
          Create Task
        </Button>

        <Box sx={{ mt: 3, boxShadow: 3 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    );
}