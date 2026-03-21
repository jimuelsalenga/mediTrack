import { Home, FileText, Bell, User, ShieldCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const tabs = user?.role === "admin"
    ? [
        { icon: Home, path: "/", label: "Home" },
        { icon: ShieldCheck, path: "/admin/queue", label: "Queue" },
        { icon: Bell, path: "/notifications", label: "Alerts", badge: true },
        { icon: User, path: "/profile", label: "Profile" },
      ]
    : [
        { icon: Home, path: "/", label: "Home" },
        { icon: FileText, path: "/upload", label: "Upload" },
        { icon: Bell, path: "/notifications", label: "Alerts" },
        { icon: User, path: "/profile", label: "Profile" },
      ];

  return (
    <nav className="flex items-center justify-around px-4 py-2 bg-card border-t border-border">
      {tabs.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="relative flex flex-col items-center gap-0.5 py-1 px-3 transition-colors active:scale-95"
          >
            <div className="relative">
              <tab.icon
                className={`w-5 h-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={active ? 2.2 : 1.8}
              />
              {"badge" in tab && tab.badge && (
                <span className="absolute -top-0.5 -right-1.5 w-2 h-2 rounded-full bg-destructive" />
              )}
            </div>
            {active && (
              <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
