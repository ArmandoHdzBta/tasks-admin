import { useEffect, useState } from "react";
import { TaskService } from "../services/TaksService";

export const useFetchTasks = () => {
    const [rows, setRows] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const {getTasks} = TaskService();

    const fetchTasks = () => {
      getTasks().then(data => setRows(data.data)).finally(() => setIsLoading(false));
      
    };

    useEffect(() => {
      fetchTasks();
    }, []);

    return { rows, isLoading, fetchTasks };
}