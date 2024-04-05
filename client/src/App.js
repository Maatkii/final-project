import "./App.css";
import Login from "./Pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";
import Home from "./Pages/Home/Home";
import { useSelector } from "react-redux";
import NavBar from "./Pages/Navbar/navbar";
import Register from "./Pages/Register/Register";
import JobPostForm from "./Pages/Client/JobPostForm/JobPostForm";
import Profile from "./Pages/Freelancer/Profile";
function App() {
  const { user } = useSelector((state) => state.LoginReducer);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute user={user}>
              <Home />
            </PublicRoute>
          }
        />
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
        <Route
          path="/job-post"
          element={
            <PublicRoute user={user}>
              <JobPostForm />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PublicRoute user={user}>
              <Profile />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
