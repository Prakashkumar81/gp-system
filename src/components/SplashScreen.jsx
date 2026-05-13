export default function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#05060a] overflow-hidden">

      <div className="glow w-[600px] h-[600px] bg-purple-600 top-[-200px] left-[-200px]"></div>
      <div className="glow w-[500px] h-[500px] bg-cyan-500 bottom-[-200px] right-[-200px]"></div>

      <div className="text-center z-10">
        <h1 className="text-7xl font-black tracking-widest bg-gradient-to-r from-cyan-300 via-pink-400 to-purple-500 text-transparent bg-clip-text">
          GP SYSTEM
        </h1>

        <p className="text-gray-400 mt-5 tracking-[6px]">
          SMART MANAGEMENT PORTAL
        </p>

        <div className="mt-10 w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>

    </div>
  );
}