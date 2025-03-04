import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { TaskSchema } from "../schemas/TaskSchema";
import { TaskDto } from "../dto/TaskDto";
import { useEffect } from "react";

interface FormTaskProps {
  onSubmitForm: (data: any) => void;
  defaults?: TaskDto,
  loading: boolean
}

export default function FormTask({
  onSubmitForm,
  defaults,
  loading,
}: FormTaskProps): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TaskSchema),
    defaultValues: defaults ?? {
      name: "",
      description: "",
      completed: false,
    },
  });

  useEffect(() => {
    if (defaults) {
      reset(defaults);
    }
  }, []);

  return (
    <form method="post" onSubmit={handleSubmit((data) => onSubmitForm(data))}>
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
          control={<Checkbox {...register("completed")} />}
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