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

  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const pendingTasks = tasks.length - completedTasks;
  const approvedNotes = notes.filter((note) => note.status === "Approved").length;
  const rejectedNotes = notes.filter((note) => note.status === "Rejected").length;
  const pendingNotes = notes.length - approvedNotes - rejectedNotes;

  return (
    <div className="min-h-screen flex glass-container text-white overflow-hidden">

      <Sidebar />

      <main className="flex-1 p-8 relative z-10">
        <div className="glass-header mb-10">
          <div>
            <p className="text-cyan-300 uppercase tracking-[0.35em] text-sm">Teacher Hub</p>
            <h1 className="text-5xl font-black tracking-tight text-white">
              3D Classroom Command Center
            </h1>
            <p className="mt-3 max-w-3xl text-slate-300">
              Manage live tasks, review note approvals, and keep your teaching flow energized with a colorful 3D interface.
            </p>
          </div>

          <div className="glass-badge success px-5 py-2 text-sm">
            Welcome back, Teacher — ready to conquer the day?
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-3 mb-8">
          <div className="glass-card-sm p-6 border-cyan-400/20 shadow-[0_30px_80px_rgba(56,189,248,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Pending Tasks</p>
            <p className="text-5xl font-extrabold text-white mt-4">{pendingTasks}</p>
            <p className="mt-3 text-slate-300">Tasks waiting for completion.</p>
          </div>

          <div className="glass-card-sm p-6 border-pink-400/20 shadow-[0_30px_80px_rgba(236,72,153,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-200">Approved Notes</p>
            <p className="text-5xl font-extrabold text-white mt-4">{approvedNotes}</p>
            <p className="mt-3 text-slate-300">Notes approved by leadership.</p>
          </div>

          <div className="glass-card-sm p-6 border-violet-400/20 shadow-[0_30px_80px_rgba(168,85,247,0.18)]">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-200">Quick Tip</p>
            <p className="text-3xl font-bold mt-4 text-white">Stay ahead by clearing tasks first.</p>
            <p className="mt-3 text-slate-300">Live updates keep your classroom aligned.</p>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <section className="glass-card p-6 border-cyan-300/15 shadow-[0_40px_110px_rgba(34,211,238,0.14)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Assigned Tasks</h2>
                <p className="text-slate-400 mt-1">Review your active teaching tasks and mark progress.</p>
              </div>
              <div className="glass-badge warning px-4 py-2 text-sm">{tasks.length} total</div>
            </div>

            {tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="glass-card-sm border-l-4 border-cyan-400/60 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-white text-lg">{task.taskTitle}</p>
                        <p className="mt-2 text-slate-400">Assigned to you with priority focus.</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`glass-badge ${task.status === 'Completed' ? 'success' : 'warning'}`}>
                          {task.status}
                        </span>
                        {task.status !== 'Completed' && (
                          <button
                            onClick={() => completeTask(task.id)}
                            className="glass-btn bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No tasks assigned yet. Check back soon.</p>
            )}
          </section>

          <aside className="glass-card p-6 border-pink-300/15 shadow-[0_40px_110px_rgba(236,72,153,0.14)]">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Notes Status</h2>
              <p className="text-slate-400 mt-1">Track uploaded notes through approval flows.</p>
            </div>

            <div className="grid gap-4">
              <div className="glass-card-sm p-4 border border-pink-400/15">
                <p className="text-sm uppercase tracking-[0.25em] text-pink-200">Approved</p>
                <p className="text-3xl font-bold text-white mt-3">{approvedNotes}</p>
              </div>

              <div className="glass-card-sm p-4 border border-amber-400/15">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-200">Rejected</p>
                <p className="text-3xl font-bold text-white mt-3">{rejectedNotes}</p>
              </div>

              <div className="glass-card-sm p-4 border border-cyan-400/15">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Pending</p>
                <p className="text-3xl font-bold text-white mt-3">{pendingNotes}</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}