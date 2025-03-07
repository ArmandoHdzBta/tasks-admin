import { useEffect } from "react";
import { TaskService } from "../services/TaksService";
import { useTask } from "./useTask";
import { useTasksContext } from "../contexts/TaskProvider";

export const useFetchTasks = () => {
    const {setRows, setIsLoading, rows, isLoading} = useTask()

    const {getTasks} = TaskService();

    const fetchTasks = () => {
      getTasks().then(data => setRows(data.data)).finally(() => setIsLoading(false));
      
    };

    const task = useTasksContext()

    useEffect(() => {
      fetchTasks();
    }, [task.rePrint]);

    return { rows, isLoading, fetchTasks };
}