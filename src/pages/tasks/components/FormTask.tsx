import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, FormControlLabel, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { TaskSchema } from "../schemas/TaskSchema";
import { TaskDto } from "../dto/TaskDto";

interface FormTaskProps {
  isEdit?: boolean,
  onSubmitForm: (data: any) => void;
  defaults?: TaskDto,
  loading: boolean
}

export default function FormTask({
  isEdit,
  onSubmitForm,
  defaults,
  loading,
}: FormTaskProps): React.ReactElement { 
  console.log({defaults});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: defaults ?? {
      id: 0,
      name: "",
      description: "",
      completed: false,
    },
  });

    return (
      <form method="post" onSubmit={handleSubmit((data) => onSubmitForm(data))}>
        {isEdit && <Input type="hidden" {...register("id")} />}
        <div className="mb-3">
          <TextField
            error={errors.name ? true : false}
            helperText={errors.name?.message}
            id="title"
            placeholder="Title"
            label="Title"
            {...register("name")}
          />
        </div>
        <div className="mb-3">
          <TextField
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            id="description"
            placeholder="Description"
            label="Description"
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <FormControlLabel
            control={<Checkbox defaultChecked={defaults?.completed} {...register("completed")} />}
            label="Completed"
          />
        </div>

        <div className="mb-3">
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "100%" }}
            loading={loading}
          >
            Save
          </Button>
        </div>
      </form>
    );
}