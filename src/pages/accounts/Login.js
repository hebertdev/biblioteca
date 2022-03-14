import { useState } from "react";

//react router dom
import { NavLink } from "react-router-dom";

//helpers
import axiosInstance from "../../helpers/axios-helpers";
import { setToken } from "../../helpers/auth-helpers";

//material UI
import {
  Box,
  Container,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
  Avatar,
  TextField,
  Link,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login({ alertSms }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButtob] = useState(true);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
    let objectValues = { ...values, [prop]: e.target.value };
    if (objectValues.email.length > 1 && objectValues.password.length > 1) {
      setDisableButtob(false);
    } else {
      setDisableButtob(true);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  async function login(email, password) {
    const { data } = await axiosInstance.post("/users/login/", {
      email,
      password,
    });

    setToken(data.access_token);
    alertSms(`Bienvenido ${data.user.first_name}`, "success");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login(values.email, values.password);

      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      alertSms("Credenciales incorrectas", "error");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inicia Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="off"
            onChange={handleChange("email")}
            value={values.email}
          />
          <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" required>
              Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {!disableButton ? (
            <>
              {loading ? (
                <LoadingButton
                  loading
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </LoadingButton>
              ) : (
                <Button
                  disableElevation
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ mt: 2, mb: 2 }}
                  disabled={disableButton}
                >
                  Iniciar Sesión
                </Button>
              )}
            </>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, opacity: 0, height: 0 }}
              disabled={disableButton}
            ></Button>
          )}

          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                sx={{ color: "inherit", textDecoration: "none" }}
              >
                Olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link
                variant="body2"
                sx={{ color: "inherit", textDecoration: "none" }}
                component={NavLink}
                to="/accounts/signup"
              >
                {"¿No tienes una cuenta? Registrarse"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
