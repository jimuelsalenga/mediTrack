import { Search } from "lucide-react";

const AppHeader = () => (
  <header className="flex items-center justify-between px-5 py-3 bg-card">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
        <span className="text-[10px] font-bold text-primary-foreground tracking-wide">NEU</span>
      </div>
      <span className="text-lg font-semibold tracking-tight text-foreground">MediTrack</span>
    </div>
    <button className="w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-secondary transition-colors active:scale-95">
      <Search className="w-5 h-5" />
    </button>
  </header>
);

export default AppHeader;
