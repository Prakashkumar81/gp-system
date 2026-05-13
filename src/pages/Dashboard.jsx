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
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h2 className="text-gray-500 text-lg">
                {card.title}
              </h2>

              <p className="text-4xl font-bold mt-4">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-4">
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