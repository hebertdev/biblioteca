import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Container from "@mui/material/Container";

export default function AlertApp({
  AlertaMensaje,
  typeAlert,
  closeAlertSms,
  type,
}) {
  //const messages = ["error", "warning", "info", "success"];
  if (!AlertaMensaje) {
    return null;
  }

  var state = {
    open: true,
    vertical: "bottom",
    horizontal: "left",
  };

  const { vertical, horizontal, open } = state;

  return (
    <Container disableGutters>
      {type ? (
        <Snackbar
          sx={{ width: "100%" }}
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert
            variant="filled"
            onClose={() => {
              closeAlertSms();
            }}
            severity={typeAlert}
          >
            {AlertaMensaje}
          </Alert>
        </Snackbar>
      ) : (
        <Alert
          variant="filled"
          onClose={() => {
            closeAlertSms();
          }}
          severity={typeAlert}
        >
          {AlertaMensaje}
        </Alert>
      )}
    </Container>
  );
}
