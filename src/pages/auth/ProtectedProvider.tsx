import { Navigate, Outlet } from "react-router";
import { useAuth } from "./AuthProvider";

export default function ProtectedProvider() {
    const auth = useAuth();
    
    return auth.isAuthenticated ? <Outlet /> : <Navigate to='/' />;
}