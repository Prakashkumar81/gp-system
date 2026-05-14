import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";

const StatusPill = ({ status }) => {
  const normalized = status || "Pending";
  const cls =
    normalized === "Completed"
      ? "glass-badge success"
      : normalized === "Approved"
        ? "glass-badge success"
        : normalized === "Rejected"
          ? "glass-badge danger"
          : "glass-badge warning";

  return <span className={cls}>{normalized}</span>;
};

export default function TeacherDashboard() {
  const [notes, setNotes] = useState([]);
  const [tasks, setTasks] = useState([]);

  // LOAD DATA
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const teacherTasks = savedTasks.filter(
      (task) => task.assignedTo === "teacher"
    );

    setNotes(savedNotes);
    setTasks(teacherTasks);
  }, []);

  // MARK TASK COMPLETE
  const completeTask = (id) => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

  const taskCounts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const pending = tasks.filter(
      (t) => t.status !== "Completed" && t.status
    ).length;

    // if status can be missing, treat as pending
    const unknownPending = tasks.filter((t) => !t.status).length;

    return {
      total,
      completed,
      pending: pending + unknownPending,
      pendingRaw: pending,
      unknownPending,
    };
  }, [tasks]);

  const noteCounts = useMemo(() => {
    const total = notes.length;
    const approved = notes.filter((n) => n.status === "Approved").length;
    const rejected = notes.filter((n) => n.status === "Rejected").length;
    const pending = total - approved - rejected;

    return { total, approved, rejected, pending };
  }, [notes]);

  const completionPct =
    taskCounts.total === 0
      ? 0
      : Math.round((taskCounts.completed / taskCounts.total) * 100);

  return (
    <div className="flex glass-container min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 relative z-10">
        {/* HEADER */}
        <div className="glass-header mb-8">
          <div>
            <p className="text-cyan-300/70 text-sm uppercase tracking-widest">
              Teacher Portal
            </p>
            <h1 className="mt-2">Teacher Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <div className="text-sm text-gray-300/80">
                Task Completion
              </div>
              <div className="flex items-center gap-3">
                <div className="w-28 h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-violet-400"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <div className="text-white font-bold">{completionPct}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Tasks",
              value: taskCounts.total,
            },
            {
              title: "Completed Tasks",
              value: taskCounts.completed,
            },
            {
              title: "Pending Tasks",
              value: taskCounts.pending,
            },
            {
              title: "Notes Pending Review",
              value: noteCounts.pending,
            },
          ].map((card, index) => (
            <div
              key={index}
              className="glass-stat-card"
              style={{ textAlign: "left" }}
            >
              <div className="stat-label">{card.title}</div>
              <div className="stat-value" style={{ fontSize: 36 }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* TASKS + NOTES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TASKS */}
          <section className="glass-card">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <span>✅</span>
              Assigned Tasks
            </h2>

            {tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-lg">
                          {task.taskTitle}
                        </p>
                        <p className="text-sm mt-2 text-gray-300">
                          Status: <span className="ml-2"> 
                            <StatusPill status={task.status} />
                          </span>
                        </p>
                      </div>

                      <div className="min-w-36 text-right">
                        <div className="text-xs text-gray-400 uppercase tracking-widest">
                          Action
                        </div>
                        {task.status !== "Completed" && (
                          <button
                            onClick={() => completeTask(task.id)}
                            className="mt-2 glass-btn-secondary"
                            style={{ padding: "10px 16px" }}
                          >
                            Mark Completed
                          </button>
                        )}
                        {task.status === "Completed" && (
                          <div className="mt-2 text-green-400 text-sm font-semibold">
                            Done 🎉
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <p className="text-gray-300 font-semibold">
                  No tasks assigned
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  When the principal assigns tasks, they will appear here.
                </p>
              </div>
            )}
          </section>

          {/* NOTES */}
          <section className="glass-card">
            <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <span>📚</span>
              Uploaded Notes Status
            </h2>

            {notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-lg break-words">
                          {note.fileName}
                        </p>
                        <p className="text-sm mt-2 text-gray-300">
                          Review: <span className="ml-2">
                            <StatusPill status={note.status || "Pending"} />
                          </span>
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-gray-400 uppercase tracking-widest">
                          Result
                        </div>
                      </div>
                    </div>

                    {note.status === "Rejected" && (
                      <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-400/20">
                        <div className="text-red-300 text-sm font-semibold">
                          Rejection Reason
                        </div>
                        <div className="text-red-200 text-sm mt-1">
                          {note.rejectionReason || "—"}
                        </div>
                      </div>
                    )}

                    {note.status === "Approved" && (
                      <div className="mt-3 p-3 rounded-xl bg-green-500/10 border border-green-400/20">
                        <div className="text-green-200 text-sm font-semibold">
                          Approved ✅
                        </div>
                        <div className="text-green-100/90 text-sm mt-1">
                          Your note has been accepted.
                        </div>
                      </div>
                    )}

                    {(note.status || "Pending") === "Pending" && (
                      <div className="mt-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-400/20">
                        <div className="text-cyan-200 text-sm font-semibold">
                          Pending Review
                        </div>
                        <div className="text-cyan-100/90 text-sm mt-1">
                          Waiting for the principal.
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <p className="text-gray-300 font-semibold">
                  No notes uploaded
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Upload your notes to track approvals here.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

