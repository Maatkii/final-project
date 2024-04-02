import "./App.css";
import Login from "./Pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";

import { useSelector } from "react-redux";
import NavBar from "./Pages/Navbar/navbar";

function App() {
  const { user } = useSelector((state) => state.LoginReducer);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute user={user}>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
