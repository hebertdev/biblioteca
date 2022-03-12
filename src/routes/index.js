//react router dom
import { Routes, Route } from "react-router-dom";

//layout
import LayoutFeed from "../components/Layout/LayoutFeed";

//Login pages
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";

//signup pages
import Login from "../pages/accounts/Login";
import Signup from "../pages/accounts/Signup";

//helpers auth
import { getToken } from "../helpers/auth-helpers";

export default function AppRoutes(props) {
  const { mode, colorMode, theme, user, alertSms } = props;
  return (
    <>
      {/*check if there is a token to know if there is a user */}
      {getToken() ? (
        <LoginRoutes
          mode={mode}
          colorMode={colorMode}
          theme={theme}
          user={user}
          alertSms={alertSms}
        />
      ) : (
        <LogoutRoutes
          mode={mode}
          colorMode={colorMode}
          theme={theme}
          alertSms={alertSms}
        />
      )}
    </>
  );
}

function LoginRoutes(props) {
  const { mode, colorMode, theme, user, alertSms } = props;
  return (
    <LayoutFeed user={user}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              mode={mode}
              colorMode={colorMode}
              theme={theme}
              alertSms={alertSms}
              user={user}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              mode={mode}
              colorMode={colorMode}
              theme={theme}
              alertSms={alertSms}
            />
          }
        />
      </Routes>
    </LayoutFeed>
  );
}

function LogoutRoutes(props) {
  const { mode, colorMode, theme, alertSms } = props;
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Login
            mode={mode}
            colorMode={colorMode}
            theme={theme}
            alertSms={alertSms}
          />
        }
      />
      <Route
        path="/accounts/signup"
        element={
          <Signup
            mode={mode}
            colorMode={colorMode}
            theme={theme}
            alertSms={alertSms}
          />
        }
      />
    </Routes>
  );
}
