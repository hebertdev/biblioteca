import { useState, useRef } from "react";

//api books
import { searchBooks } from "../api/books";

//components
import BookCard from "./BookCard/index";
import SkeletonCard from "./BookCard/SkeletonCard";

//material UI
import { Box, Grid, TextField, Typography, Button } from "@mui/material";

export default function SearchBooks(props) {
  const { alertSms, setSearching } = props;
  const [queryText, setQueryText] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultBooks, setResultBooks] = useState(null);

  function handleQueryText(e) {
    setQueryText(e.target.value);
    if (e.target.value.length === 0) {
      setSearching(false);
      setResultBooks(null);
    }
  }

  let inputText = useRef(null);

  async function handleSearch(e) {
    e.preventDefault();

    if (queryText.length < 1) {
      return null;
    }

    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      document.getElementById("outlined-basic").blur();

      const data = await searchBooks(queryText);
      setResultBooks(data.results);
      console.log(data);
      setSearching(true);
      setLoading(false);
      setQuery(queryText);

      //focus of input
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  let n = 4;

  const goToHome = () => {
    setSearching(false);
    setQueryText("");
    setResultBooks(null);
  };

  //function to delete book
  const deleteBookID = (id) => {
    setResultBooks(resultBooks.filter((resultBooks) => resultBooks.id !== id));
  };

  return (
    <Box>
      <Box component={"form"} onSubmit={handleSearch}>
        <TextField
          label="Buscar libros"
          variant="outlined"
          size="small"
          fullWidth
          name="title"
          sx={{ display: "block", width: "100%", marginBottom: "20px" }}
          onChange={handleQueryText}
          value={queryText}
          ref={inputText}
          id="outlined-basic"
        />
      </Box>

      <Box>
        <Grid container spacing={1}>
          {loading && [...Array(n)].map((e, i) => <SkeletonCard key={i} />)}
          {resultBooks?.length === 0 && loading === false && (
            <Box sx={{ width: "95%", margin: "auto" }}>
              <Typography variant="h4">
                No se encontraron resultados para <b>{query}</b>
              </Typography>
              <Button variant="outlined" onClick={goToHome}>
                go to home
              </Button>
            </Box>
          )}
          {resultBooks?.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              deleteBookID={deleteBookID}
              alertSms={alertSms}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
