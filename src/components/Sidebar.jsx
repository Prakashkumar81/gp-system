import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="w-64 bg-black text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-10">
        GP SYSTEM
      </h1>

      <div className="flex flex-col gap-4">
        {/* ADMIN */}
        {role === "admin" && (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/upload")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Upload
            </button>

            <button
              onClick={() => navigate("/assign")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Assign
            </button>

            <button
              onClick={() => navigate("/tasks")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Tasks
            </button>

            <button
              onClick={() => navigate("/users")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Users
            </button>
          </>
        )}

        {/* PRINCIPAL */}
        {role === "principal" && (
          <>
            <button
              onClick={() => navigate("/principal")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Principal Dashboard
            </button>

            <button
              onClick={() => navigate("/tasks")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Review Tasks
            </button>
          </>
        )}

        {/* TEACHER */}
        {role === "teacher" && (
          <>
            <button
              onClick={() => navigate("/teacher")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Teacher Dashboard
            </button>

            <button
              onClick={() => navigate("/upload")}
              className="text-left hover:bg-gray-800 p-3 rounded-xl"
            >
              Upload Notes
            </button>
          </>
        )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="mt-10 bg-red-500 px-4 py-3 rounded-xl w-full"
      >
        Logout
      </button>
    </div>
  );
}