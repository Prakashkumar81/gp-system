import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  // LOAD TASKS
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(savedTasks);
  };

  // DELETE TASK
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    setTasks(updatedTasks);
  };

  return (
    <div className="glass-container min-h-screen p-8 relative z-10">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          📋 Assigned Tasks
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
        {tasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="p-4 text-left text-cyan-400 font-semibold">User</th>
                  <th className="p-4 text-left text-cyan-400 font-semibold">Task</th>
                  <th className="p-4 text-left text-cyan-400 font-semibold">Status</th>
                  <th className="p-4 text-left text-cyan-400 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4">{task.user || "—"}</td>
                    <td className="p-4">{task.task}</td>
                    <td className="p-4">
                      <span className="glass-badge warning">
                        ⏳ {task.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="glass-btn-danger text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No Tasks Assigned</p>
          </div>
        )}
      </div>
    </div>
  );
}