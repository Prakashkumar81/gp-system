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
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Principal Dashboard
          </h1>

          <div className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
            Pending Reviews: {pendingCount}
          </div>
        </div>

        {/* REVIEW BOX */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6">
            Uploaded Notes Review
          </h2>

          {notes.length > 0 ? (
            <div className="space-y-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="border p-5 rounded-2xl"
                >
                  {/* FILE INFO */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-lg">
                        {note.fileName}
                      </p>

                      <p className="text-sm mt-2">
                        Status:
                        <span
                          className={`ml-2 font-bold ${
                            note.status === "Approved"
                              ? "text-green-600"
                              : note.status === "Rejected"
                              ? "text-red-500"
                              : "text-yellow-500"
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
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              approveNote(note.id)
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              rejectNote(note.id)
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                  </div>

                  {/* REJECTION INPUT */}
                  {note.status !== "Approved" &&
                    note.status !== "Rejected" && (
                      <input
                        type="text"
                        placeholder="Enter rejection reason"
                        value={rejectReason[note.id] || ""}
                        onChange={(e) =>
                          setRejectReason({
                            ...rejectReason,
                            [note.id]:
                              e.target.value,
                          })
                        }
                        className="border p-3 rounded-lg w-full mt-4"
                      />
                    )}
                </div>
              ))}
            </div>
          ) : (
            <p>No Uploaded Notes</p>
          )}
        </div>
      </div>
    </div>
  );
}