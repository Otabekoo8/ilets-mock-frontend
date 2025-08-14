export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/60 border-b border-white/20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="" />
          <div className="w-[100px] pt-5 h-[100px] font-bold gradient-text">
            <img src="../../../public/logo.png" alt="" />
          </div>
        </div>
        <div className="text-sm text-black/60">Frontend • React + Tailwind 4</div>
      </div>
    </header>
  );
}
