import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function Upload() {
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState([]);

  // LOAD SAVED NOTES
  useEffect(() => {
    const savedNotes =
      JSON.parse(localStorage.getItem("notes")) || [];

    setNotes(savedNotes);
  }, []);

  // HANDLE FILE SELECT
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // HANDLE UPLOAD
  const handleUpload = () => {
    if (!fileName) {
      alert("Please select a file");
      return;
    }

    const newNote = {
      id: Date.now(),
      fileName: fileName,
    };

    const updatedNotes = [...notes, newNote];

    // SAVE TO LOCALSTORAGE
    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    setNotes(updatedNotes);

    alert("Note Uploaded Successfully");

    setFileName("");
  };

  // DELETE NOTE
  const deleteNote = (id) => {
    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

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
          <h1>📤 Upload Notes</h1>
        </div>

        {/* UPLOAD BOX */}
        <div className="glass-card max-w-xl mb-10">
          <h2 className="text-xl font-bold mb-6">Select File</h2>
          <input
            type="file"
            onChange={handleFileChange}
            className="glass-input w-full"
          />

          {fileName && (
            <div className="glass-card-sm mt-4 border-l-4 border-cyan-400">
              <p className="text-sm text-gray-400">Selected:</p>
              <p className="font-bold mt-1">✓ {fileName}</p>
            </div>
          )}

          <button
            onClick={handleUpload}
            className="glass-btn w-full mt-6"
          >
            Upload Note
          </button>
        </div>

        {/* NOTES LIST */}
        <div className="glass-card">
          <h2 className="text-2xl font-bold mb-6">
            📋 Uploaded Notes
          </h2>

          {notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="glass-card-sm flex justify-between items-center"
                >
                  <p className="font-semibold">{note.fileName}</p>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="glass-btn-danger"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-8">No Notes Uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}