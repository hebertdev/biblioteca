import { useState, useRef } from "react";

//book api
import { createBook } from "../api/books";

//material UI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function AddBookButton({ books, setBooks, alertSms }) {
  const [currentBook, setCurrentBook] = useState({
    title: "",
    author: "",
    edition: "",
    publication_date: `2022-01-01`,
    quantity: "",
    id: "",
    cover: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [newCover, setNewCover] = useState(null);

  const [loading, setLoading] = useState(false);

  let inputNewCover = useRef(null);
  let previewNewCover = useRef(null);

  function onChangeFileNewCover() {
    let inputFileCover = inputNewCover.current.files[0];
    let previewImgCover = previewNewCover.current;
    let readFile = new FileReader();

    setNewCover(inputFileCover);

    if (inputFileCover) {
      readFile.readAsDataURL(inputFileCover);
      readFile.onloadend = function () {
        previewImgCover.src = readFile.result;
      };
    } else {
      previewImgCover.src = "";
    }
  }

  function handleChange(e) {
    setCurrentBook({ ...currentBook, [e.target.name]: e.target.value });
  }

  function handleDeleteCover() {
    setNewCover(null);
    previewNewCover.current.src = "";
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  async function onSubmitNewBook(e) {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const newBook = new FormData();
      newBook.append("title", currentBook.title);
      newBook.append("author", currentBook.author);
      newBook.append("edition", currentBook.edition);
      newBook.append("publication_date", currentBook.publication_date);
      newBook.append("quantity", currentBook.quantity);
      if (newCover) {
        newBook.append("cover", newCover);
      }

      const data = await createBook(newBook);
      let newArray = [];
      newArray.unshift(data);
      setBooks([...newArray, ...books]);
      setLoading(false);
      alertSms("Libro agregado correctamente", "success", true);
      setCurrentBook({
        title: "",
        author: "",
        edition: "",
        publication_date: "",
        quantity: "",
        cover: "",
      });
      setNewCover(null);
      handleCloseModal();
    } catch (error) {
      alertSms("Error al agregar el libro", "error", true);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        sx={{ marginBottom: "20px" }}
        onClick={() => setOpenModal(true)}
      >
        AGREGAR NUEVO LIBRO
      </Button>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Agregar libro</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            required
            sx={{
              "& > :not(style)": { margin: "5px" },
            }}
            onSubmit={onSubmitNewBook}
          >
            <TextField
              label="Título del libro"
              variant="outlined"
              size="small"
              multiline
              fullWidth
              name="title"
              defaultValue={currentBook.title}
              onChange={handleChange}
            />
            <TextField
              label="Autor"
              variant="outlined"
              size="small"
              fullWidth
              name="author"
              defaultValue={currentBook.author}
              onChange={handleChange}
            />
            <TextField
              label="Año de publicación"
              variant="outlined"
              size="small"
              fullWidth
              type="date"
              name="publication_date"
              defaultValue={currentBook.publication_date}
              onChange={handleChange}
            />
            <TextField
              label="Edición"
              variant="outlined"
              size="small"
              fullWidth
              name="edition"
              defaultValue={currentBook.edition}
              onChange={handleChange}
            />
            <TextField
              label="Cantidad de ejemplares"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              name="quantity"
              defaultValue={currentBook.quantity}
              onChange={handleChange}
            />
            <label htmlFor="new-cover">
              <input
                accept="image/*"
                id="new-cover"
                multiple
                type="file"
                ref={inputNewCover}
                onChange={onChangeFileNewCover}
                style={{ display: "none" }}
              />
              <Button
                variant="contained"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Agregar una portada
              </Button>
            </label>

            <img
              src=""
              ref={previewNewCover}
              style={{
                display: "block",
                maxWidth: "250px",
                margin: "20px auto",
              }}
            />
            {newCover && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteCover}
              >
                quitar foto
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>cancelar</Button>
          {loading ? (
            <LoadingButton loading variant="outlined">
              Agregar
            </LoadingButton>
          ) : (
            <>
              {newCover ? (
                <Button variant="contained" onClick={onSubmitNewBook}>
                  Agregar
                </Button>
              ) : (
                <Button disabled={true} variant="contained">
                  Agregar
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
