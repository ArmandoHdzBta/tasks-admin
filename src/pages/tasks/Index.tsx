import { Box, Button, Chip, Typography } from "@mui/material";
import TaskNavigation from "./components/TaskNavigation";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ActionsTableComponent from "./components/ActionsTableComponent";
import { NavLink } from "react-router";
import { useFetchTasks } from "./hooks/useFetchTasks";
import { useDeleteTask } from "./hooks/useDeleteTask";

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

    const { rows, isLoading } = useFetchTasks();
    const {onDeleteTask} = useDeleteTask();

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
            loading={isLoading}
          />
        </Box>
      </div>
    );
}