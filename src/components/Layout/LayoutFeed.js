//react router dom
import { NavLink } from "react-router-dom";

import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { indigo } from "@mui/material/colors";

//layout que envuele a toda la pagina y que contiene el menu de navegacion
//cuando el usuario a iniciado sesión

export default function LayoutFeed({ user, children }) {
  return (
    <Container sx={{ display: "flex", oferflow: "hidden" }} disableGutters>
      <Hidden smDown>
        <Box sx={{ minWidth: 240, width: 240 }}>
          <Box sx={{ minWidth: 240, width: 240 }} position="fixed">
            <Box sx={{ maxWidth: 240, p: "0 8px" }}>
              <ListMenuLeft user={user} />
            </Box>
          </Box>
        </Box>
      </Hidden>

      <Box
        sx={{
          flexGrow: 1,
          padding: "8px 0",
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export function ListMenuLeft({ user, setOpenModalRight }) {
  function closeModal() {
    if (!setOpenModalRight) {
      return null;
    } else {
      setOpenModalRight(false);
    }
  }

  return (
    <List component="nav">
      <ListItem
        button
        component={NavLink}
        to={`/`}
        onClick={closeModal}
        style={({ isActive }) => ({ color: isActive ? indigo[400] : "" })}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="INICIO" />
      </ListItem>
      <ListItem
        button
        component={NavLink}
        to={`/favorites`}
        onClick={closeModal}
        style={({ isActive }) => ({ color: isActive ? indigo[400] : "" })}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <FavoriteBorderOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="MIS FAVORITOS" />
      </ListItem>
    </List>
  );
}
