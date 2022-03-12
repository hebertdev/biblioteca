import { useState } from "react";

//react router dom
import { NavLink, useNavigate } from "react-router-dom";

//axiosInstance
import axiosInstance from "../../helpers/axios-helpers";

//material UI
import {
  Box,
  Container,
  Button,
  Avatar,
  TextField,
  Link,
  Grid,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignUp({ alertSms }) {
  const [creandoUsuario, setCreandoUsuario] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [lastnameError, setLastnameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfError, setPasswordConfError] = useState(null);
  // eslint-disable-next-line
  const [nonFieldsError, setNonFieldsError] = useState(null);
  const [usuario, setUsuario] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
  });

  const expresiones = {
    // eslint-disable-next-line
    username: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    // eslint-disable-next-line
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    // eslint-disable-next-line
    password: /^.{8,15}$/, // 4 a 12 digitos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // eslint-disable-next-line
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const navigate = useNavigate();

  function handleInputChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    // eslint-disable-next-line
    switch (e.target.name) {
      case "username":
        setUsuario({
          ...usuario,
          [e.target.name]: e.target.value.toLowerCase(),
        });
        if (expresiones.username.test(e.target.value.toLowerCase())) {
          setUsernameError(null);
        } else {
          setUsernameError(
            "No se permite espacios ni Carácteres  especiales , más de 3 y menos de 16 digitos."
          );
        }
        break;
      case "email":
        if (expresiones.email.test(e.target.value)) {
          setEmailError(null);
        } else {
          setEmailError("Ingrese un correo valido.");
        }
        break;
      case "first_name":
        if (expresiones.name.test(e.target.value)) {
          setNameError(null);
        } else {
          setNameError("Ingrese un nombre valido.");
        }
        break;
      case "last_name":
        if (expresiones.name.test(e.target.value)) {
          setLastnameError(null);
        } else {
          setLastnameError("Ingrese un nombre valido.");
        }
        break;
      case "password":
        if (expresiones.password.test(e.target.value)) {
          setPasswordError(null);
        } else {
          setPasswordError("Ingrese una contraseña de 8 a 15 digitos.");
        }
        break;
      case "password_confirmation":
        if (expresiones.password.test(e.target.value)) {
          setPasswordConfError(null);
        } else {
          setPasswordConfError("Ingrese una contraseña de 8 a 15 digitos.");
        }
        break;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (creandoUsuario) {
      return null;
    }

    try {
      setCreandoUsuario(true);

      let modified_user = {
        ...usuario,
        username: usuario.username.toLowerCase(),
      };

      await signup(modified_user);
      navigate("/accounts/login", { replace: true });
      alertSms("Cuenta creada, ya puedes iniciar sesión.", "success");
      setCreandoUsuario(false);
    } catch (error) {
      setCreandoUsuario(false);
      alertSms("Hubo un problema al registrarse intente de nuevo.", "error");
      setEmailError(error.response.data.email);
      setUsernameError(error.response.data.username);
      setNameError(error.response.data.first_name);
      setLastnameError(error.response.data.last_name);
      setPasswordError(error.response.data.password);
      setPasswordConfError(error.response.data.password_confirmation);
      setNonFieldsError(error.response.data.non_field_errors);
    }
  }

  async function signup(usuario) {
    await axiosInstance.post("/users/signup/", usuario);
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
          Crea una cuenta
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={nameError ? true : false}
                helperText={nameError}
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="first_name"
                label="Nombre"
                value={usuario.first_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={lastnameError ? true : false}
                helperText={lastnameError}
                required
                fullWidth
                id="last_name"
                label="Apellidos"
                name="last_name"
                value={usuario.last_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={usernameError ? true : false}
                helperText={usernameError}
                required
                fullWidth
                id="username"
                label="Nombre de usuario"
                name="username"
                value={usuario.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError ? true : false}
                helperText={emailError}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={usuario.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError ? true : false}
                helperText={passwordError}
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                value={usuario.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordConfError ? true : false}
                helperText={passwordConfError}
                required
                fullWidth
                name="password_confirmation"
                label="Confirmación de contraseña"
                type="password"
                id="password_confirmation"
                autoComplete="new-password"
                value={usuario.password_confirmation}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          {!usernameError &&
          !nameError &&
          !lastnameError &&
          !emailError &&
          !passwordError &&
          !passwordConfError ? (
            <>
              {creandoUsuario === false ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  size="large"
                  disableElevation
                >
                  Crear cuenta
                </Button>
              ) : (
                <LoadingButton
                  loading
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </LoadingButton>
              )}
            </>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, opacity: 0, height: 0 }}
              disabled={true}
            ></Button>
          )}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                sx={{ color: "inherit", textDecoration: "none" }}
                component={NavLink}
                to="/accounts/login"
              >
                {"Ya tienes una cuenta? Inicie sesión "}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

function Copyright(props) {
  return (
    <>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="#">
          Betsocial
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>

      <br />
      <br />
      <br />
    </>
  );
}
