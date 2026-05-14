import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [approvedNotes, setApprovedNotes] = useState(0);
  const [rejectedNotes, setRejectedNotes] = useState(0);

  useEffect(() => {
    const tasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    const notes =
      JSON.parse(localStorage.getItem("notes")) || [];

    setTaskCount(tasks.length);

    const pending = notes.filter(
      (note) =>
        note.status !== "Approved" &&
        note.status !== "Rejected"
    ).length;

    setPendingTasks(pending);

    const approved = notes.filter(
      (note) => note.status === "Approved"
    ).length;

    setApprovedNotes(approved);

    const rejected = notes.filter(
      (note) => note.status === "Rejected"
    ).length;

    setRejectedNotes(rejected);
  }, []);

  const cards = [
    {
      title: "Total Tasks",
      value: taskCount,
    },
    {
      title: "Pending Reviews",
      value: pendingTasks,
    },
    {
      title: "Approved Notes",
      value: approvedNotes,
    },
    {
      title: "Rejected Notes",
      value: rejectedNotes,
    },
  ];

  return (
    <div className="flex glass-container min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 relative z-10">
        <div className="glass-header mb-10">
          <div>
            <p className="text-cyan-300/70 text-sm uppercase tracking-widest">Admin Console</p>
            <h1 className="mt-2">Admin Dashboard</h1>
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="glass-stat-card"
            >
              <div className="stat-label">{card.title}</div>
              <div className="stat-value">{card.value}</div>
            </div>
          ))}
        </div>

        {/* ACTIVITY */}
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-6">
            System Activity
          </h2>

          <div className="space-y-4">
            <div className="border p-4 rounded-xl">
              Tasks are being assigned dynamically
            </div>

            <div className="border p-4 rounded-xl">
              Teachers can upload notes
            </div>

            <div className="border p-4 rounded-xl">
              Principal can approve/reject notes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}