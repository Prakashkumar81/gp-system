import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "Rahul",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Aman",
      role: "Manager",
      status: "Pending",
    },
    {
      id: 3,
      name: "Priya",
      role: "Employee",
      status: "Active",
    },
  ];

  return (
    <div className="glass-container min-h-screen p-8 relative z-10">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          👥 Users
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="glass-btn-secondary"
        >
          ← Back
        </button>
      </div>

      {/* TABLE */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="p-4 text-left text-cyan-400 font-semibold">ID</th>
                <th className="p-4 text-left text-cyan-400 font-semibold">Name</th>
                <th className="p-4 text-left text-cyan-400 font-semibold">Role</th>
                <th className="p-4 text-left text-cyan-400 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4">#{user.id}</td>
                  <td className="p-4 font-semibold">{user.name}</td>
                  <td className="p-4">
                    <span className="glass-badge">{user.role}</span>
                  </td>
                  <td className="p-4">
                    <span className="glass-badge success">✓ {user.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}