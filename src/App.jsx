import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Assign from "./pages/Assign";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";

// PROTECTED ROUTE
function ProtectedRoute({ children, allowedRoles }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  // NOT LOGGED IN
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // ROLE NOT ALLOWED
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* UPLOAD */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "teacher"]}
            >
              <Upload />
            </ProtectedRoute>
          }
        />

        {/* ASSIGN */}
        <Route
          path="/assign"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Assign />
            </ProtectedRoute>
          }
        />

        {/* USERS */}
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* TASKS */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute
              allowedRoles={["admin", "principal"]}
            >
              <Tasks />
            </ProtectedRoute>
          }
        />

        {/* PRINCIPAL */}
        <Route
          path="/principal"
          element={
            <ProtectedRoute allowedRoles={["principal"]}>
              <PrincipalDashboard />
            </ProtectedRoute>
          }
        />

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}