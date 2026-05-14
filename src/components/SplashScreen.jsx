export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#0a0012] via-[#1a0033] to-[#000a1a] overflow-hidden z-50">
      
      {/* Dynamic Glowing Orbs */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full top-[-300px] left-[-300px] opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-pink-500 to-red-500 rounded-full bottom-[-250px] right-[-250px] opacity-25 blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full top-1/2 left-1/2 opacity-20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>

      {/* Main Content */}
      <div className="text-center z-20 relative">
        <style>{`
          @keyframes float-bounce {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-20px) scale(1.05); }
          }
          @keyframes glow-text {
            0%, 100% { text-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3); }
            50% { text-shadow: 0 0 30px rgba(236, 72, 153, 0.7), 0 0 60px rgba(236, 72, 153, 0.4); }
          }
          .splash-title { animation: float-bounce 3s ease-in-out infinite, glow-text 3s ease-in-out infinite; }
        `}</style>
        
        <h1 className="splash-title text-7xl font-black tracking-widest bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
          GP SYSTEM
        </h1>

        <p className="text-cyan-300 mt-6 tracking-[6px] font-bold text-lg animate-pulse">
          ⚡ SMART MANAGEMENT PORTAL ⚡
        </p>

        {/* Animated Ring Spinner */}
        <div className="mt-12 flex justify-center items-center">
          <div className="relative w-28 h-28">
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-pink-500 border-b-purple-500 animate-spin"
            ></div>
            <div className="absolute inset-2 rounded-full border border-cyan-400/25"></div>
            <div className="absolute inset-5 rounded-full bg-cyan-400/10 blur-sm animate-pulse"></div>
          </div>
        </div>

        <p className="text-gray-400 mt-8 text-sm tracking-widest">Loading...</p>
      </div>

    </div>
  );
}