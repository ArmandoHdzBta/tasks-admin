import { Outlet } from "react-router";
import AuthLayout from "../../layouts/AuthLayout";

export default function TaskPage() {
    

    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    );
}