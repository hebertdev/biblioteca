import { useEffect, useState, useRef } from "react";

//api book
import { editBook } from "../../api/books";

//components
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

//helpers img
import { modifiedUrlImage } from "../../helpers/axios-helpers";
//material UI
import {
  Box,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function BookActions({
  book,
  setBook,
  deleteBookID,
  alertSms,
  user,
}) {
  // eslint-disable-next-line
  const [isAdmin, setIsAdmin] = useState(user.user.is_manager);
  const [openModal, setOpenModal] = useState(false);
  const [isLike, setIsLike] = useState(book.is_like);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
      {isAdmin && (
        <Button variant="outlined" onClick={handleOpenModal}>
          Modificar
        </Button>
      )}
      <ActionsModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        book={book}
        setBook={setBook}
        alertSms={alertSms}
        isAdmin={isAdmin}
      />
      {isAdmin ? (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LikeButton book={book} isLike={isLike} setIsLike={setIsLike} />

            <DeleteButton
              book={book}
              deleteBookID={deleteBookID}
              alertSms={alertSms}
            />
          </Box>
        </>
      ) : (
        <LikeButton book={book} isLike={isLike} setIsLike={setIsLike} />
      )}
    </CardActions>
  );
}

//modal para las acciones los usuario
function ActionsModal({
  openModal,
  handleCloseModal,
  book,
  setBook,
  alertSms,
  isAdmin,
}) {
  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {isAdmin ? (
        <AdminActions
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          book={book}
          setBook={setBook}
          alertSms={alertSms}
        />
      ) : (
        <UserActions
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </Dialog>
  );
}

//sección de usuario
function UserActions({ openModal, handleCloseModal }) {
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        {"llena los datos para reservar"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          en construcción
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>cancelar</Button>
        <Button onClick={handleCloseModal}>reservar</Button>
      </DialogActions>
    </>
  );
}

const Input = styled("input")({
  display: "none",
});

//sección de administrador // editar libro
function AdminActions({ handleCloseModal, book, setBook, alertSms }) {
  const [currentBook, setCurrentBook] = useState(book);
  const [newCover, setNewCover] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  //efecto para verificar si se modifico el libro
  useEffect(() => {
    if (
      Object.entries(book).toString() === Object.entries(currentBook).toString()
    ) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [currentBook, book]);

  let inputCover = useRef(null);
  let previewCover = useRef(null);

  function onChangeFileCover() {
    let $inputFile = inputCover.current.files[0];
    let $previewImg = previewCover.current;
    let $readFile = new FileReader();

    setNewCover($inputFile);

    if ($inputFile) {
      $readFile.readAsDataURL($inputFile);
      $readFile.onloadend = function () {
        $previewImg.src = $readFile.result;
      };
    } else {
      $previewImg.src = "";
    }
  }

  function handleChange(e) {
    setCurrentBook({ ...currentBook, [e.target.name]: e.target.value });
  }

  function handleDeleteCover() {
    setNewCover(null);
    previewCover.current.src = "";
  }

  //función para mandar a editar el libro
  async function handleEditBook() {
    if (loading) return;
    try {
      setLoading(true);
      let newData = new FormData();

      newData.append("title", currentBook.title);
      newData.append("author", currentBook.author);
      newData.append("description", currentBook.description);
      newData.append("quantity", currentBook.quantity);
      newData.append("publication_date", currentBook.publication_date);
      if (newCover) newData.append("cover", newCover);

      const data = await editBook(currentBook.id, newData);
      setBook({ ...data });
      alertSms("Libro actualizado correctamente", "success", true);
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setLoading(false);
      alertSms("Ups hubo un error, inténtalo de nuevo.", "error", true);
    }
  }
  return (
    <>
      <DialogTitle id="alert-dialog-title">Editar libro</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            "& > :not(style)": { margin: "5px" },
          }}
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
            name="publication_date"
            defaultValue={currentBook.publication_date}
            onChange={handleChange}
            type="date"
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
          <label htmlFor={`${book.title}-${book.id}`}>
            <Input
              accept="image/*"
              id={`${book.title}-${book.id}`}
              multiple
              type="file"
              ref={inputCover}
              onChange={onChangeFileCover}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<PhotoCamera />}
            >
              cambiar portada
            </Button>
          </label>

          <img
            src={modifiedUrlImage(book.cover)}
            ref={previewCover}
            alt="."
            style={{ display: "block", maxWidth: "250px", margin: "20px auto" }}
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
            guardar
          </LoadingButton>
        ) : (
          <>
            {newCover ? (
              <Button onClick={handleEditBook} variant="contained">
                Guardar
              </Button>
            ) : (
              <Button
                onClick={handleEditBook}
                variant="contained"
                disabled={isModified}
              >
                Guardar
              </Button>
            )}
          </>
        )}
      </DialogActions>
    </>
  );
}
