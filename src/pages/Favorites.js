import { useEffect, useState } from "react";

//api books
import { getFavorites } from "../api/books";

//components
import BookCard from "../components/BookCard/index";
import SkeletonCard from "../components/BookCard/SkeletonCard";

//material UI
import { Container, Box, Typography, Grid } from "@mui/material";

export default function Favorites({ alertSms }) {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetFavoriteBooks();
    // eslint-disable-next-line
  }, []);

  const GetFavoriteBooks = async () => {
    if (loading) {
      return null;
    }
    try {
      setLoading(true);
      const data = await getFavorites();
      setBooks(data.books);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  //function to delete book
  const deleteBookID = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  let n = 8;

  return (
    <Container disableGutters sx={{ padding: "0 5px" }}>
      <Typography variant="h4" sx={{ fontWeight: "600", marginBottom: "15px" }}>
        Libros que te gustan
      </Typography>
      <Box>
        <Grid container spacing={1}>
          {books?.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              alertSms={alertSms}
              deleteBookID={deleteBookID}
            />
          ))}
          {loading && [...Array(n)].map((e, i) => <SkeletonCard key={i} />)}
        </Grid>
      </Box>
    </Container>
  );
}
