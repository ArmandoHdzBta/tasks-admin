import axios from "axios";
import { useFetchTasks } from "./useFetchTasks";

export const useDeleteTask = () => {
    const { fetchTasks } = useFetchTasks();

    const onDeleteTask = async (id: number) => {
        const URL = import.meta.env.VITE_URL_BACKEND;

        await axios
          .delete(`${URL}/tasks/${id}`)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            fetchTasks()
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            console.log("Task deleted");
          });
    };

    return { onDeleteTask };
}