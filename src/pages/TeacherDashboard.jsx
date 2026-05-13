import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function TeacherDashboard() {
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);

  // LOAD DATA
  useEffect(() => {
    const savedNotes =
      JSON.parse(localStorage.getItem("notes")) || [];

    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    const teacherTasks = savedTasks.filter(
      (task) => task.assignedTo === "teacher"
    );

    setNotes(savedNotes);
    setTasks(teacherTasks);
  }, []);

  // MARK TASK COMPLETE
  const completeTask = (id) => {
    const allTasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = allTasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: "Completed",
        };
      }
      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    const teacherTasks = updatedTasks.filter(
      (task) => task.assignedTo === "teacher"
    );

    setTasks(teacherTasks);
  };

  return (
    <div className="min-h-screen flex bg-[#05060a] text-white">

      {/* SIDEBAR */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 overflow-y-auto">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-6">
          Teacher Dashboard
        </h1>

        {/* TASKS SECTION */}
        <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10">

          <h2 className="text-xl font-bold mb-4">
            Assigned Tasks
          </h2>

          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 rounded-xl bg-black/30 border border-white/10"
                >
                  <p className="font-bold text-lg">
                    {task.taskTitle}
                  </p>

                  <p className="text-sm mt-2 text-gray-300">
                    Status:
                    <span
                      className={`ml-2 font-bold ${
                        task.status === "Completed"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {task.status}
                    </span>
                  </p>

                  {task.status !== "Completed" && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="mt-3 bg-green-500 text-black px-4 py-2 rounded-lg hover:scale-105 transition"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No Tasks Assigned</p>
          )}
        </div>

        {/* NOTES SECTION */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">

          <h2 className="text-xl font-bold mb-4">
            Uploaded Notes Status
          </h2>

          {notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-black/30 border border-white/10"
                >
                  <p className="font-bold text-lg">
                    {note.fileName}
                  </p>

                  <p className="text-sm mt-2 text-gray-300">
                    Status:
                    <span
                      className={`ml-2 font-bold ${
                        note.status === "Approved"
                          ? "text-green-400"
                          : note.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {note.status || "Pending"}
                    </span>
                  </p>

                  {note.status === "Rejected" && (
                    <p className="text-red-400 text-sm mt-2">
                      Reason: {note.rejectionReason}
                    </p>
                  )}

                  {note.status === "Approved" && (
                    <p className="text-green-400 text-sm mt-2 font-semibold">
                      Your note has been approved
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No Notes Uploaded</p>
          )}
        </div>

      </div>
    </div>
  );
}