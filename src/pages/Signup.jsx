import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [error, setError] = useState("");

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "principal", password: "principal123", role: "principal" },
    { username: "teacher", password: "teacher123", role: "teacher" },
  ];

  const handleSignup = () => {
    if (!name || !username || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      setError("Username already exists. Please choose another.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);

    if (role === "admin") navigate("/dashboard");
    if (role === "principal") navigate("/principal");
    if (role === "teacher") navigate("/teacher");
  };

  return (
    <div className="login-root">
      <div className="login-glow glow1"></div>
      <div className="login-glow glow2"></div>
      <div className="login-glow glow3"></div>

      <div className="login-card">
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Join GP SYSTEM</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="login-input"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="login-input"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="login-input"
        >
          <option value="teacher">Teacher</option>
          <option value="principal">Principal</option>
          <option value="admin">Admin</option>
        </select>

        {error && (
          <div className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            {error}
          </div>
        )}

        <button onClick={handleSignup} className="login-btn">
          Create Account
        </button>

        <div className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-cyan-300 hover:text-white underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
