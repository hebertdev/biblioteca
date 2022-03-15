import { useState } from "react";

//layout list menu left
import { ListMenuLeft } from "../Layout/LayoutFeed";

//Material UI
import { Box, IconButton, Hidden, SwipeableDrawer } from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function ButtonMenuLeft() {
  const [openMenuLeft, setOpenMenuLeft] = useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenMenuLeft(!openMenuLeft);
  };

  return (
    <Hidden smUp>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuOutlinedIcon />
      </IconButton>
      <SwipeableDrawer
        open={openMenuLeft}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        anchor="left"
      >
        <Box sx={{ flexGrow: 1, margin: "auto", p: 2 }}>
          <ListMenuLeft setOpenMenuLeft={setOpenMenuLeft} />
        </Box>
      </SwipeableDrawer>
    </Hidden>
  );
}
