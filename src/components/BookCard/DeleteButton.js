import { useState } from "react";

//api book
import { deleteBook } from "../../api/books";

//material UI
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function DeleteButton({ book, deleteBookID, alertSms }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleCloseModal() {
    setOpenModal(false);
  }

  async function handleDeleteBook() {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      await deleteBook(book.id);
      deleteBookID(book.id);
      handleCloseModal();
      alertSms("Libro eliminado", "success", true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alertSms("Error al eliminar libro", "error", true);
    }
  }

  return (
    <>
      <IconButton
        aria-label="add to favorites"
        color="error"
        onClick={() => setOpenModal(true)}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Eliminar libro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            seguro que quieres eliminar el libro " <b>{book.title}</b> "?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingButton loading variant="outlined">
              eliminar
            </LoadingButton>
          ) : (
            <Button onClick={handleDeleteBook} color="error">
              Eliminar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
