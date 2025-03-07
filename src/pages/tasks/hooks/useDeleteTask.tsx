import axios from "axios";

export const useDeleteTask = () => {

    const onDeleteTask = async (id: number) => {
        const URL = import.meta.env.VITE_URL_BACKEND;
        
        await axios
          .delete(`${URL}/tasks/${id}`)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
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