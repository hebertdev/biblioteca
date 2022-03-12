import { useEffect } from "react";

//React router DOM
import { NavLink } from "react-router-dom";

//user api
import { whoami } from "../../api/user";

//helpers
import { getToken } from "../../helpers/auth-helpers";

//Material UI
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined";

export default function Header({ setUser, logout, colorMode, theme, mode }) {
  useEffect(() => {
    if (getToken()) {
      loadUser();
    }
    return null;
  }, []);

  async function loadUser() {
    try {
      const data = await whoami();
      setUser(data);
    } catch (error) {
      console.log("ups hubo un error");
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backdropFilter: "blur(20px)",
          webkitBackdropFilter: "blur(20px)",
          boxShadow: `${mode === "light" ? "inset 0px -1px 1px #e7ebf0" : ""}`,
          background: `${
            mode === "light" ? "rgba(255,255,255,0.72)" : "#272727"
          }`,
          color: `${mode === "light" ? "#272727" : "white"}`,
        }}
      >
        <Container disableGutters sx={{ padding: "0 5px" }}>
          <Toolbar disableGutters variant="dense">
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "600", color: "inherit" }}
                component={NavLink}
                to="/"
              >
                Library
              </Typography>
            </Box>
            {getToken() ? (
              <>
                <Button sx={{ color: "inherit" }} onClick={logout}>
                  logout
                </Button>
              </>
            ) : (
              <Button
                sx={{ color: "inherit" }}
                component={NavLink}
                to={"/accounts/signup"}
              >
                Registrarse
              </Button>
            )}
            <IconButton
              sx={{ ml: 1 }}
              color="inherit"
              onClick={colorMode.toggleColorMode}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness5OutlinedIcon />
              ) : (
                <Brightness4OutlinedIcon />
              )}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
