import { Alert, Box, Link, Typography } from "@mui/material";
import TaskNavigation from "./components/TaskNavigation"
import { useAuth } from "../auth/AuthProvider";
import { Navigate, NavLink } from "react-router";
import FormTask from "./components/FormTask";
import { NewTaskDto } from "./dto/NewTaskDto";
import { useState } from "react";
import axios from "axios";
import { TaskDto } from "./dto/TaskDto";

export default function Create() {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    <Navigate to="/" />;
  }

  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({
    alert: false
  });
  const [data, setData] = useState<TaskDto>();

  const onSubmitNewTask = async (data: NewTaskDto) => {
    setLoading(true);

    const URL = import.meta.env.VITE_URL_BACKEND;
    
    await axios.post(`${URL}/tasks`, data)
    .then(response => response.data)
    .then(data => {
      console.log(data);
      setData({
        name: "",
        description: "",
        completed: false,
      });
      setFormStatus({ alert: true });
      setTimeout(() => {
        setFormStatus({ alert: false });
      }, 3000);
    })
    .catch(error => {
      console.log(error);
      
    })
    .finally(() =>{
      setLoading(false);
    })
  }

    return (
      <div>
        <TaskNavigation>
          <Link
            component={NavLink}
            underline="hover"
            color="inherit"
            to="/task"
          >
            Index
          </Link>
          <Typography sx={{ color: "text.primary" }}>New</Typography>
        </TaskNavigation>

        {formStatus.alert && (
          <Alert severity="success" sx={{ mb: 3 }}>
            This is a success Alert.
          </Alert>
        )}

        <Box sx={{ width: 500, boxShadow: 2, p: 3, mx: "auto" }}>
          <FormTask onSubmitForm={onSubmitNewTask} defaults={data} loading={loading} />
        </Box>
      </div>
    );
}