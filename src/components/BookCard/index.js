import { useState, useContext } from "react";

//context
import UserContext from "../../contexts/UserContext";

//components
import BookCover from "./BookCover";
import BookContent from "./BookContent";
import BookActions from "./BookActions";

//material UI
import { Card, Grid } from "@mui/material";

export default function BookCard({
  book: currentBook,
  deleteBookID,
  alertSms,
}) {
  const [book, setBook] = useState(currentBook);
  const { user } = useContext(UserContext);

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card>
        <BookCover book={book} />
        <BookContent book={book} />
        <BookActions
          book={book}
          setBook={setBook}
          alertSms={alertSms}
          deleteBookID={deleteBookID}
          user={user}
        />
      </Card>
    </Grid>
  );
}
