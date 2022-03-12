import { useContext, useEffect, useState } from "react";

//react router dom
import { BrowserRouter } from "react-router-dom";

//contexts and their providers
import DarkModeContext, { DarkModeProvider } from "./contexts/DarkModeContext";
import UserContext, { UserProvider } from "./contexts/UserContext";

//routes
import AppRoutes from "./routes/index";

//helpers
import { axiosInterceptors } from "./helpers/axios-helpers";

//component
import Header from "./components/Header/index";
import AlertApp from "./components/Alerts/index";

//Material UI
import { Box, Toolbar, CssBaseline } from "@mui/material";

//check if the user token is expired
axiosInterceptors();

export default function AppConfig() {
  return (
    <UserProvider>
      <DarkModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeProvider>
    </UserProvider>
  );
}

function App() {
  const { mode, colorMode, theme } = useContext(DarkModeContext);
  const { user, setUser, logout } = useContext(UserContext);

  //Estados y funciones del alerta
  const [AlertaMensaje, setAlertaMensaje] = useState(null);
  const [typeAlert, setTypeAlert] = useState("error");
  const [type, setType] = useState(null);

  function closeAlertSms() {
    setAlertaMensaje(null);
  }

  function alertSms(mensaje, typealert, type) {
    setAlertaMensaje(mensaje);
    setTypeAlert(typealert);
    setType(type);
    setTimeout(function () {
      setAlertaMensaje(null);
    }, 8000);
  }

  //useEffect for change theme in body
  useEffect(() => {
    document.body.style.backgroundColor =
      theme.palette.mode === "light"
        ? "#f5f5f5"
        : theme.palette.background.default;
  }, [theme.palette.background.default]);

  return (
    <Box
      sx={{
        bgcolor: `${
          theme.palette.mode === "light" ? "#f5f5f5" : "background.default"
        }`,
      }}
    >
      <CssBaseline />
      <Header
        user={user}
        setUser={setUser}
        mode={mode}
        colorMode={colorMode}
        theme={theme}
        logout={logout}
      />
      <Toolbar />
      <AlertApp
        AlertaMensaje={AlertaMensaje}
        typeAlert={typeAlert}
        closeAlertSms={closeAlertSms}
        type={type}
      />

      <AppRoutes
        mode={mode}
        colorMode={colorMode}
        theme={theme}
        user={user}
        alertSms={alertSms}
      />
    </Box>
  );
}
