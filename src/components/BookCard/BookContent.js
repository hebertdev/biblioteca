//material UI
import { Typography, CardContent } from "@mui/material";

export default function BookContent({ book }) {
  return (
    <CardContent>
      <Typography gutterBottom variant="h7">
        {book.title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        <br />
        <b>AUTOR:</b> {book.author} <br />
        <b>EDICIÓN:</b> {book.edition} <br />
        <b>FECHA DE PUBLICACIÓN:</b> {book.publication_date} <br />
        <b>DISPONIBLE:</b> {book.quantity}
      </Typography>
    </CardContent>
  );
}
