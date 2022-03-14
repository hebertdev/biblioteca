import { useEffect, useState } from "react";

//book api
import { bookList } from "../api/books";

//components
import AddBookButton from "../components/AddBookButton";
import SearchBooks from "../components/SearchBooks";

import BookCard from "../components/BookCard/index";
import SkeletonCard from "../components/BookCard/SkeletonCard";

//material UI
import { Container, Box, Typography, Grid, Button } from "@mui/material";

export default function Home({ alertSms, user }) {
  const [books, setBooks] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const data = await bookList();
      setBooks(data.results);
      setNextPage(data.next);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function deleteBookID(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  return (
    <Container disableGutters sx={{ padding: "0 5px" }}>
      <Typography variant="h4" sx={{ fontWeight: "600", marginBottom: "15px" }}>
        los libros que quieras
      </Typography>
      {user?.user?.is_manager && (
        <AddBookButton books={books} setBooks={setBooks} alertSms={alertSms} />
      )}

      {/*
      <SearchBooksAlgolia
        deleteBookID={deleteBookID}
        alertSms={alertSms}
        setSearching={setSearching}
      />
      */}

      <SearchBooks
        deleteBookID={deleteBookID}
        alertSms={alertSms}
        setSearching={setSearching}
      />
      {searching === false && (
        <BookList
          books={books}
          setBooks={setBooks}
          loading={loading}
          setLoading={setLoading}
          nextPage={nextPage}
          setNextPage={setNextPage}
          deleteBookID={deleteBookID}
          alertSms={alertSms}
        />
      )}
    </Container>
  );
}

function BookList({
  books,
  setBooks,
  loading,
  nextPage,
  setNextPage,
  setLoading,
  deleteBookID,
  alertSms,
}) {
  const n = 8;

  async function getMoreBooks() {
    if (loading) return;
    try {
      setLoading(true);
      const data = await bookList(nextPage);
      setBooks(books.concat(data.results));
      setNextPage(data.next);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
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
      {nextPage ? (
        <Button
          variant="contained"
          sx={{ margin: "20px auto", display: "block" }}
          onClick={getMoreBooks}
        >
          Mostrar más
        </Button>
      ) : (
        <>
          <br />
        </>
      )}
    </Box>
  );
}
