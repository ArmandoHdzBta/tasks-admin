import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./assets/main.css";
import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from "./pages/IndexPage";
import TaskPage from "./pages/tasks/TaskPage";
import Index from "./pages/tasks/Index";
import Create from "./pages/tasks/Create";
import Edit from "./pages/tasks/Edit";
import Login from "./pages/auth/Login";
import ProtectedProvider from "./pages/auth/ProtectedProvider";
import Singup from "./pages/auth/Singup";
import { AuthProvider } from "./pages/auth/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Singup />} />

        <Route element={<ProtectedProvider />}>
          <Route path="dashboard" index element={<IndexPage />} />

          <Route path="task" element={<TaskPage />}>
            <Route index element={<Index />} />
            <Route path="new" element={<Create />} />
            <Route path="edit/:id" element={<Edit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
