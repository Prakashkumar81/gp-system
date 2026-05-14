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
    <div className="flex glass-container min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10 relative z-10 overflow-y-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
            📺 Upload Content
          </h1>

          <p className="text-gray-400">
            Upload educational broadcast content
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="glass-card max-w-5xl"
        >

          {/* Error */}
          {error && (
            <div className="glass-badge danger block w-full text-center py-3 mb-6">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <label className="text-gray-300 block mb-2 font-semibold">
              Title *
            </label>

            <input
              type="text"
              placeholder="Enter content title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass-input w-full"
            />
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="text-gray-300 block mb-2 font-semibold">
              Subject *
            </label>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="glass-input w-full"
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
            <label className="text-gray-300 block mb-2 font-semibold">
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Write content description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-input w-full"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">

            <label className="text-gray-300 block mb-2 font-semibold">
              Upload File *
            </label>

            <label className="border-2 border-dashed border-white/20 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:bg-white/10 transition">

              <div className="text-6xl mb-4">
                📤
              </div>

              <p className="text-gray-300 text-lg">
                Click to upload image
              </p>

              <p className="text-gray-400 text-sm mt-2">
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

              <p className="text-gray-300 mb-3 font-semibold">
                Preview
              </p>

              <img
                src={preview}
                alt="preview"
                className="w-full max-w-md rounded-3xl border border-white/20"
              />
            </div>
          )}

          {/* Time Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            <div>
              <label className="text-gray-300 block mb-2 font-semibold">
                Start Time *
              </label>

              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-2 font-semibold">
                End Time *
              </label>

              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="glass-input w-full"
              />
            </div>

            <div>
              <label className="text-gray-300 block mb-2 font-semibold">
                Rotation Duration
              </label>

              <input
                type="number"
                placeholder="Seconds"
                value={rotation}
                onChange={(e) => setRotation(e.target.value)}
                className="glass-input w-full"
              />
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="glass-btn px-8 py-4 text-lg font-bold"
          >
            Upload Content 🚀
          </button>

        </form>

      </div>
    </div>
  );
}