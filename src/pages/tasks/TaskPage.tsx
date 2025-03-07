import { Outlet } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";
import { TaskProvider } from "./contexts/TaskProvider";

export default function TaskPage() {
    

    return (
      <AuthLayout>
        <TaskProvider>
        <Outlet />

        </TaskProvider>
      </AuthLayout>
    );
}