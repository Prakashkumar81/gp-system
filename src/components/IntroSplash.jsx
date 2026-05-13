import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroSplash() {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 2000);
    const t2 = setTimeout(() => navigate("/login"), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className={`intro ${fade ? "fade" : ""}`}>
      
      <div className="intro-glow glow1"></div>
      <div className="intro-glow glow2"></div>
      <div className="intro-glow glow3"></div>

      <div className="intro-content">
        <div className="pulse-ring"></div>

        <h1 className="intro-title">GP SYSTEM</h1>

        <p className="intro-sub">
          Initializing Secure SaaS Platform...
        </p>

        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}