import { NavLink, useParams } from "react-router";
import FormTask from "./components/FormTask";
import TaskNavigation from "./components/TaskNavigation";
import { Link, Typography } from "@mui/material";
import { EditTaskDto } from "./dto/EditTaskDto";
import { useEffect, useState } from "react";
import axios from "axios";
import { TaskDto } from "./dto/TaskDto";

export default function Edit() {
    const { id } = useParams();

    const [data, setData] = useState<TaskDto>();

    const URL = import.meta.env.VITE_URL_BACKEND;

    useEffect(() => {
      const getTaskById = async () => {
        await axios
          .get(`${URL}/tasks/${id}`)
          .then((res) => res.data)
          .then((response) => {
            console.log(response);
            setData({
              name: response.data.name,
              description: response.data.description,
              completed: response.data.completed,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };

      getTaskById();
    }, []);

    const [loading, setLoading] = useState(false);

    const onSubmitEditTask = (data: EditTaskDto) =>{
        const URL = import.meta.env.VITE_URL_BACKEND;
        const newData = {...data, id: parseInt(id)};
        console.log(newData);
        setLoading(true);

        axios.patch(`${URL}/tasks/${id}`, newData)
            .then(response => response.data)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })

    }

    return (
      <div>
        <TaskNavigation>
          <Link component={NavLink} underline="hover" color="inherit" to="/task">
            Index
          </Link>
          <Typography sx={{ color: "text.primary" }}>Edit: {id}</Typography>
        </TaskNavigation>

        <FormTask onSubmitForm={onSubmitEditTask} defaults={ data } loading={loading} />
      </div>
    );
}