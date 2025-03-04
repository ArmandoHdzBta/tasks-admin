import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GuestLayout from "../../layouts/GuestLayout";
import { LoginSchema } from "./schemas/LoginSchema";
import { useState } from "react";
import Footer from "./components/Footer";
import { LoginDto } from "./dto/LoginDto";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";

export default function Login() {

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: zodResolver(LoginSchema),
    })

    const [authErrors, setAuthErrors] = useState({
        message: "",
    });

    const [ loading, setLoading ] = useState(false);

    const auth = useAuth();
    const goTo = useNavigate();

    if (auth.isAuthenticated) {
      goTo("/dashboard");
    }

    const login = async (data: LoginDto) => {
    
        setLoading(true);

        const URL = import.meta.env.VITE_URL_BACKEND;

        await axios.post(`${URL}/auth/login`, data)
            .then(response => response.data)
            .then(data => {
                auth.Auth(data);
                
                setLoading(false);

                goTo("/dashboard");
            })
            .catch(error => {
                setAuthErrors({
                    message: error.response.data.message,
                });
                setLoading(false);
                setError("email", {
                    message: error.response.data.message,

                });
            })
    }

    return (
      <GuestLayout>
        <Box sx={{ mb: 2, width: 400, mx: "auto" }} mt={6} boxShadow={3} p={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Log in
          </Typography>
          <form method="post" onSubmit={handleSubmit(login)}>
            {authErrors.message && (
              <div className="mb-6">
                <Alert severity="error">{authErrors.message}.</Alert>
              </div>
            )}
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
                Login
              </Button>
            </div>
          </form>

          <Footer isLogin />
        </Box>
      </GuestLayout>
    );
}