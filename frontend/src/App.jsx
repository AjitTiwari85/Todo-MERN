import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const isAuth = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Login/Register page */}
        <Route
          path="/"
          element={isAuth ? <Navigate to="/tasks" replace /> : <Auth />}
        />

        {/* Protected tasks page */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
