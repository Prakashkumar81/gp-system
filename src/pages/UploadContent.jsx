import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function UploadContent() {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [rotation, setRotation] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/gif"];

    if (!allowed.includes(file.type)) {
      setError("Only PNG JPG GIF allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Max file size is 10MB");
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !subject || !startTime || !endTime) {
      setError("Please fill all required fields");
      return;
    }

    if (new Date(endTime) <= new Date(startTime)) {
      setError("End time must be greater than start time");
      return;
    }

    setError("");

    alert("Content Uploaded Successfully 🚀");
  };

  return (
    <div className="flex bg-black min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-white mb-3">
            Upload Content
          </h1>

          <p className="text-zinc-400">
            Upload educational broadcast content
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 max-w-5xl"
        >

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label className="text-zinc-300 block mb-2">
              Title *
            </label>

            <input
              type="text"
              placeholder="Enter content title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none"
            />
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="text-zinc-300 block mb-2">
              Subject *
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none"
            >
              <option value="">Select Subject</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Biology</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="text-zinc-300 block mb-2">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Write content description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">

            <label className="text-zinc-300 block mb-2">
              Upload File *
            </label>

            <label className="border-2 border-dashed border-zinc-700 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer bg-zinc-900">

              <div className="text-6xl mb-4">
                📤
              </div>

              <p className="text-zinc-300 text-lg">
                Click to upload image
              </p>

              <p className="text-zinc-500 text-sm mt-2">
                PNG JPG GIF • Max 10MB
              </p>

              <input
                type="file"
                className="hidden"
                onChange={handleFile}
              />
            </label>

          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-8">

              <p className="text-zinc-300 mb-3">
                Preview
              </p>

              <img
                src={preview}
                alt="preview"
                className="w-full max-w-md rounded-3xl border border-zinc-700"
              />
            </div>
          )}

          {/* Time Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            <div>
              <label className="text-zinc-300 block mb-2">
                Start Time *
              </label>

              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 block mb-2">
                End Time *
              </label>

              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none"
              />
            </div>

            <div>
              <label className="text-zinc-300 block mb-2">
                Rotation Duration
              </label>

              <input
                type="number"
                placeholder="Seconds"
                value={rotation}
                onChange={(e) => setRotation(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-white outline-none"
              />
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition"
          >
            Upload Content 🚀
          </button>

        </form>

      </div>
    </div>
  );
}