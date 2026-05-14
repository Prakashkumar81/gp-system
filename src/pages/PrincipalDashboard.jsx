import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function PrincipalDashboard() {
  const [notes, setNotes] = useState([]);
  const [rejectReason, setRejectReason] = useState({});

  // LOAD NOTES
  useEffect(() => {
    const savedNotes =
      JSON.parse(localStorage.getItem("notes")) || [];

    setNotes(savedNotes);
  }, []);

  // PENDING COUNT
  const pendingCount = notes.filter(
    (note) =>
      note.status !== "Approved" &&
      note.status !== "Rejected"
  ).length;

  // APPROVE NOTE
  const approveNote = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          status: "Approved",
          rejectionReason: "",
        };
      }

      return note;
    });

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    setNotes(updatedNotes);
  };

  // REJECT NOTE
  const rejectNote = (id) => {
    const reason = rejectReason[id];

    if (!reason) {
      alert("Please enter rejection reason");
      return;
    }

    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          status: "Rejected",
          rejectionReason: reason,
        };
      }

      return note;
    });

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    setNotes(updatedNotes);
  };

  return (
    <div className="flex glass-container min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8 relative z-10">
        <div className="glass-header mb-10">
          <div>
            <p className="text-violet-300/70 text-sm uppercase tracking-widest">Principal Console</p>
            <h1 className="mt-2">Principal Dashboard</h1>
          </div>
          <div className="glass-badge warning">
            ⏳ Pending Reviews: {pendingCount}
          </div>
        </div>

        {/* REVIEW BOX */}
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-6">
            📋 Uploaded Notes Review
          </h2>

          {notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="glass-card-sm"
                >
                  {/* FILE INFO */}
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-lg">
                        {note.fileName}
                      </p>

                      <p className="text-sm mt-2">
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

                      {note.rejectionReason && (
                        <p className="text-red-500 mt-2">
                          Reason:
                          <span className="ml-2">
                            {note.rejectionReason}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* ACTION BUTTONS */}
                    {note.status !== "Approved" &&
                      note.status !== "Rejected" && (
                        <div className="flex gap-3 flex-wrap">
                          <button
                            onClick={() =>
                              approveNote(note.id)
                            }
                            className="glass-btn"
                          >
                            ✓ Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectNote(note.id)
                            }
                            className="glass-btn-danger"
                          >
                            ✕ Reject
                          </button>
                        </div>
                      )}
                  </div>

                  {/* REJECTION INPUT */}
                  {note.status !== "Approved" &&
                    note.status !== "Rejected" && (
                      <input
                        type="text"
                        placeholder="Enter rejection reason..."
                        value={rejectReason[note.id] || ""}
                        onChange={(e) =>
                          setRejectReason({
                            ...rejectReason,
                            [note.id]:
                              e.target.value,
                          })
                        }
                        className="glass-input w-full mt-4"
                      />
                    )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">No Uploaded Notes</p>
          )}
        </div>
      </div>
    </div>
  );
}