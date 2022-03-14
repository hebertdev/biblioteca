import axiosInstance from "../helpers/axios-helpers";

export async function createBook(book) {
  const { data } = await axiosInstance.post("/books/", book);
  return data;
}

export async function bookList(url) {
  const { data } = await axiosInstance.get(url ? url : "/books/");
  return data;
}

export async function editBook(id, book) {
  const { data } = await axiosInstance.patch(`/books/${id}/edit_book/`, book);
  return data;
}

export async function deleteBook(id) {
  const { data } = await axiosInstance.delete(`/books/${id}/delete_book/`);
  return data;
}

export async function searchBooks(query) {
  const { data } = await axiosInstance.get(`/books/?search=${query}`);
  return data;
}
