import { useState, useMemo, useRef, useEffect } from "react";

//axios helpers
import axiosInstance from "../helpers/axios-helpers";

//algolia
import { createAutocomplete } from "@algolia/autocomplete-core";

//components
import BookCard from "./BookCard/index";

//material UI
import { Box, Grid, TextField } from "@mui/material";

export default function SearchBooks(props) {
  const { alertSms, deleteBookID, setSearching } = props;

  const [autoCompleteState, setAutoCompleteState] = useState({
    collections: [],
    isOpen: false,
  });

  const autoComplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: "Buscar libros",
        onStateChange: ({ state }) => setAutoCompleteState(state),
        getSources: () => [
          {
            sourceId: "offfer-next-api",
            getItems: ({ query }) => {
              if (!!query) {
                return axiosInstance
                  .get(`/books/?search=${query}`)
                  .then((res) => res.data.results);
              } else {
                console.log("no query");
                return [];
              }
            },
          },
        ],
        ...props,
      }),
    [props]
  );

  const formRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  const formProps = autoComplete.getFormProps({
    inputElement: inputRef.current,
  });

  const inputProps = autoComplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <Box>
      <Box component={"form"} ref={formRef} {...formProps}>
        <TextField
          label="Buscar libros"
          variant="outlined"
          size="small"
          fullWidth
          name="title"
          sx={{ display: "block", width: "100%", marginBottom: "20px" }}
          ref={inputRef}
          {...inputProps}
        />
      </Box>
      {autoCompleteState.isOpen && (
        <Box ref={panelRef} {...autoComplete.getPanelProps()}>
          {autoCompleteState.collections.map((collection, index) => {
            const { items } = collection;
            return (
              <Box key={`section-${index}`} sx={{ marginBottom: "10px" }}>
                {items.length > 0 && (
                  <Grid container spacing={1} {...autoComplete.getListProps()}>
                    {items.map((book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        deleteBookID={deleteBookID}
                        alertSms={alertSms}
                      />
                    ))}
                  </Grid>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
