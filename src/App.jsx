import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AuthProvider, AuthContext } from "./context/AuthProvider";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import PeopleList from "./pages/PeopleList";
import { useContext } from "react";

function AppRoutes() {
  const { loggedUser } = useContext(AuthContext);

  return (
    <>
      {/* Navbar only shows if logged in */}
      {loggedUser && <Navbar />}

      <div style={{ display: "flex", flex: 1, height: "100vh", overflow: "hidden" }}>
        {/* Sidebar only shows if logged in */}
        {loggedUser && <Sidebar links={["Overview", "People Directory"]} />}

        <main
          style={{
            flex: 1,
            backgroundColor: "#f9f9f9",
            padding: loggedUser ? "20px" : "0px", // no padding for login/register
            overflowY: "auto",
            display: "flex",
            justifyContent: loggedUser ? "flex-start" : "center",
            alignItems: loggedUser ? "flex-start" : "center",
          }}
        >
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={loggedUser ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={loggedUser ? <Navigate to="/" replace /> : <Register />}
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={loggedUser ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/people"
              element={loggedUser ? <PeopleList /> : <Navigate to="/login" replace />}
            />

            {/* Catch-all redirect */}
            <Route
              path="*"
              element={<Navigate to={loggedUser ? "/" : "/login"} replace />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
