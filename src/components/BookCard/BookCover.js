//helpers
import { modifiedUrlImage } from "../../helpers/axios-helpers";

//material UI
import { CardMedia } from "@mui/material";

export default function BookCover({ book }) {
  return (
    <CardMedia
      component="img"
      image={modifiedUrlImage(book.cover)}
      sx={{ maxHeight: "300px", minHeight: "300px", width: "100%" }}
    />
  );
}
