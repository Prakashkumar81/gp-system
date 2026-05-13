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
    <div className="min-h-screen bg-gray-100 p-8">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-black">
          Assigned Tasks
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
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Task</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b"
                >
                  <td className="p-4">{task.user}</td>

                  <td className="p-4">{task.task}</td>

                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {task.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-6 text-center"
                >
                  No Tasks Assigned
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}