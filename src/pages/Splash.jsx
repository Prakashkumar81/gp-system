import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 3500);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">

      {/* Glow Effects */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "linear",
          }}
          className="text-8xl mb-6"
        >
          📡
        </motion.div>

        <h1 className="text-6xl font-black text-white mb-4 tracking-widest">
          GP SYSTEM
        </h1>

        <p className="text-zinc-400 text-lg">
          Authenticating Secure Broadcasting Platform...
        </p>

        <div className="mt-10 flex justify-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </motion.div>
    </div>
  );
}