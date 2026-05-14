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
    <div className="w-64 glass-sidebar text-white p-6 min-h-screen sticky top-0 flex flex-col">
      <h1 className="text-2xl font-bold mb-10 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        GP SYSTEM
      </h1>

      <div className="flex flex-col gap-3 flex-1">
        {/* ADMIN */}
        {role === "admin" && (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-cyan-400"
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => navigate("/upload")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-cyan-400"
            >
              📤 Upload
            </button>

            <button
              onClick={() => navigate("/assign")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-cyan-400"
            >
              📌 Assign
            </button>

            <button
              onClick={() => navigate("/tasks")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-cyan-400"
            >
              ✓ Tasks
            </button>

            <button
              onClick={() => navigate("/users")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-cyan-400"
            >
              👥 Users
            </button>
          </>
        )}

        {/* PRINCIPAL */}
        {role === "principal" && (
          <>
            <button
              onClick={() => navigate("/principal")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-violet-400"
            >
              🎓 Principal Dashboard
            </button>

            <button
              onClick={() => navigate("/tasks")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-violet-400"
            >
              📋 Review Tasks
            </button>
          </>
        )}

        {/* TEACHER */}
        {role === "teacher" && (
          <>
            <button
              onClick={() => navigate("/teacher")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-green-400"
            >
              👨‍🏫 Teacher Dashboard
            </button>

            <button
              onClick={() => navigate("/upload")}
              className="text-left hover:bg-white/10 p-3 rounded-lg transition duration-200 hover:border-l-2 hover:border-green-400"
            >
              📝 Upload Notes
            </button>
          </>
        )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="glass-btn-danger w-full mt-auto"
      >
        🚪 Logout
      </button>
    </div>
  );
}