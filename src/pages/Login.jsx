import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";

export default function Login() {
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "principal", password: "principal123", role: "principal" },
    { username: "teacher", password: "teacher123", role: "teacher" },
  ];

  const handleLogin = () => {
    const validUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!validUser) {
      alert("Invalid Credentials");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", validUser.role);

    if (validUser.role === "admin") navigate("/dashboard");
    if (validUser.role === "principal") navigate("/principal");
    if (validUser.role === "teacher") navigate("/teacher");
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="login-root">
      <div className="login-glow glow1"></div>
      <div className="login-glow glow2"></div>
      <div className="login-glow glow3"></div>

      <div className="login-card">
        <h1 className="login-title">GP SYSTEM</h1>
        <p className="login-subtitle">Premium Management Portal</p>

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

        <button onClick={handleLogin} className="login-btn">
          Login
        </button>

        <div className="login-demo">
          <p>Admin → admin / admin123</p>
          <p>Principal → principal / principal123</p>
          <p>Teacher → teacher / teacher123</p>
        </div>
      </div>
    </div>
  );
}