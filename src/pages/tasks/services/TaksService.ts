import axios from "axios"
import { useAuth } from "../../auth/AuthProvider"

const URL = import.meta.env.VITE_URL_BACKEND;

export const TaskService = () => {
  const auth = useAuth();
  const TOKEN = auth.getToken();
  
  const getTasks = () => {
    
        const response = axios.get(`${URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        })
        .then((response) => response.data)
        .then(data => data)

        return response;
    }

    return {getTasks}
}