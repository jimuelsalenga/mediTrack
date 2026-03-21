import { Search } from "lucide-react";
import neuLogo from "@/assets/neu-logo.png";

const AppHeader = () => (
  <header className="flex items-center justify-between px-5 py-3 bg-card border-b">
    <div className="flex items-center gap-2">
      <img 
        src={neuLogo} 
        alt="NEU Logo" 
        className="w-8 h-8 object-contain" 
      />
      <span className="font-bold text-lg tracking-tight text-foreground">
        MediTrack
      </span>
    </div>
    
    <button className="w-9 h-9 rounded-full flex items-center justify-center text-primary hover:bg-secondary transition-colors active:scale-95">
      <Search className="w-5 h-5" />
    </button>
  </header>
);

export default AppHeader;