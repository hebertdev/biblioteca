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
    <>
      {type ? (
        <>
          <Snackbar
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
        </>
      ) : (
        <Container disableGutters>
          <Alert
            variant="filled"
            onClose={() => {
              closeAlertSms();
            }}
            severity={typeAlert}
          >
            {AlertaMensaje}
          </Alert>
        </Container>
      )}
    </>
  );
}
