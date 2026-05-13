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
    <div className="flex bg-gray-100 min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Upload Notes
        </h1>

        {/* UPLOAD BOX */}
        <div className="bg-white p-8 rounded-2xl shadow max-w-xl mb-10">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-3 w-full rounded-lg"
          />

          {fileName && (
            <div className="mt-4">
              Selected:
              <span className="font-bold ml-2">
                {fileName}
              </span>
            </div>
          )}

          <button
            onClick={handleUpload}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
          >
            Upload Note
          </button>
        </div>

        {/* NOTES LIST */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold mb-6">
            Uploaded Notes
          </h2>

          {notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="flex justify-between items-center border p-4 rounded-xl"
                >
                  <p>{note.fileName}</p>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No Notes Uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
}