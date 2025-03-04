import { Breadcrumbs } from "@mui/material";

interface TaskNavigationProps {
    children: React.ReactNode;
}

export default function TaskNavigation({ children }: TaskNavigationProps) {
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{ p: 2, px: 1, boxShadow: 3, mb: 3 }}>
        {children}
      </Breadcrumbs>
    );
}