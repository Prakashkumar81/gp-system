import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Assign() {
  const [taskTitle, setTaskTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [tasks, setTasks] = useState([]);

  // LOAD TASKS
  useEffect(() => {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    setTasks(savedTasks);
  }, []);

  // ASSIGN TASK
  const assignTask = () => {
    if (!taskTitle || !assignedTo) {
      alert("Fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      taskTitle,
      assignedTo,
      status: "Pending",
    };

    const updatedTasks = [...tasks, newTask];

    localStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );

    setTasks(updatedTasks);

    setTaskTitle("");
    setAssignedTo("");

    alert("Task Assigned Successfully");
  };

  return (
    <div className="flex glass-container min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 relative z-10">
        <div className="glass-header mb-10">
          <h1>📌 Assign Tasks</h1>
        </div>

        {/* FORM */}
        <div className="glass-card max-w-xl mb-10">
          <h2 className="text-xl font-bold mb-6">Create New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
            className="glass-input w-full mb-4"
          />

          <select
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            className="glass-input w-full mb-6"
          >
            <option value="">
              Select Teacher
            </option>

            <option value="teacher">
              Teacher
            </option>
          </select>

          <button
            onClick={assignTask}
            className="glass-btn w-full"
          >
            Assign Task
          </button>
        </div>

        {/* TASK LIST */}
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-8">
            📋 Assigned Tasks
          </h2>

          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="glass-card-sm border-l-4 border-cyan-400"
                >
                  <p className="font-bold">
                    {task.taskTitle}
                  </p>

                  <div className="flex gap-3 mt-3 flex-wrap">
                    <span className="text-sm text-gray-400">To: <span className="text-white font-semibold capitalize">{task.assignedTo}</span></span>
                    <span className="glass-badge warning">⏳ {task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">No Tasks Assigned</p>
          )}
        </div>
      </div>
    </div>
  );
}