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
    <div className="min-h-screen bg-gray-100 p-8">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">
          Users
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Back
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b"
              >
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}