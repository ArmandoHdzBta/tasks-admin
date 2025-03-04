import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router";

interface ActionsTableComponentProps {
    id: number,
    onDelete: (id: number) => void
}

export default function ActionsTableComponent ({ id, onDelete }: ActionsTableComponentProps) {
    return (
        <Box>
            <IconButton component={NavLink} to={`/task/edit/${id}`} color="warning">
                <EditIcon />
            </IconButton>
            
            <IconButton type="button" color="error" onClick={(id) => onDelete(id)}>
                <DeleteIcon />
            </IconButton>
        </Box>
    )
}