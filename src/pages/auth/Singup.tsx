import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./schemas/LoginSchema";
import { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import { Box, Button, TextField, Typography } from "@mui/material";
import Footer from "./components/Footer";
import { LoginDto } from "./dto/LoginDto";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

export default function Singup() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(LoginSchema),
    });

    const auth = useAuth();
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
      goTo("/dashboard");
    }

    const [loading, setLoading] = useState(false);

    const login = async (data: LoginDto) => {
      setLoading(true);

      setTimeout(() => {
        console.log(data);
        setLoading(false);
      }, 1000);
    };

    return (
      <GuestLayout>
        <Box sx={{ mb: 2, width: 400, mx: "auto" }} mt={6} boxShadow={3} p={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Sing up
          </Typography>
          <form method="post" onSubmit={handleSubmit(login)}>
            <div className="mb-2">
              <TextField
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                fullWidth
                id="email"
                label="Email"
                placeholder="email"
                variant="outlined"
                {...register("email")}
              />
            </div>
            <div className="mb-2">
              <TextField
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                id="password"
                fullWidth
                label="Password"
                placeholder="password"
                type="password"
                variant="outlined"
                {...register("password")}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                loadingPosition="start"
                loading={loading}
              >
                Sing up
              </Button>
            </div>
          </form>

          <Footer isSingUp />
        </Box>
      </GuestLayout>
    );
}