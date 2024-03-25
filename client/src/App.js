import "./App.css";
import "./style.css";
import "./Components/style.css";
import Login from "./Pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from "./utils/PublicRoute";

import { useSelector } from "react-redux";

import Footer from "./Components/Footer/Footer";

function App() {
  const { user } = useSelector((state) => state.LoginReducer);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
