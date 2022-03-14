//material UI
import { Container, Box, Typography } from "@mui/material";

export default function Favorites() {
  return (
    <Container disableGutters sx={{ padding: "0 5px" }}>
      <Typography variant="h4" sx={{ fontWeight: "600", marginBottom: "15px" }}>
        Libros que te gustan
      </Typography>
      <Box>
        <Typography>En construcción</Typography>
      </Box>
    </Container>
  );
}
