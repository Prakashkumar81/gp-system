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
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Assign Tasks
        </h1>

        {/* FORM */}
        <div className="bg-white p-6 rounded-2xl shadow max-w-xl mb-10">
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-4"
          />

          <select
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            className="border p-3 rounded-lg w-full mb-4"
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
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Assign Task
          </button>
        </div>

        {/* TASK LIST */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6">
            Assigned Tasks
          </h2>

          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border p-4 rounded-xl"
                >
                  <p className="font-bold">
                    {task.taskTitle}
                  </p>

                  <p className="mt-2">
                    Assigned To:
                    <span className="ml-2 font-semibold">
                      {task.assignedTo}
                    </span>
                  </p>

                  <p className="mt-2">
                    Status:
                    <span className="ml-2 font-semibold text-yellow-500">
                      {task.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No Tasks Assigned</p>
          )}
        </div>
      </div>
    </div>
  );
}