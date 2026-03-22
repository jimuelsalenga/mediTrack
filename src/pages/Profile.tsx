import { User, Stethoscope, FileText, Calendar, IdCard } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  const infoCards = [
    { icon: IdCard, label: "ROLE", value: user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "—" },
    { icon: Stethoscope, label: "COMPLIANCE STATUS", value: "Approved" },
    { icon: FileText, label: "LATEST RECORD", value: "Chest X-Ray" },
    { icon: Calendar, label: "TERM", value: "2026" },
  ];

  return (
    <MobileLayout>
      <div className="px-5 py-4 space-y-5">
        <div className="bg-card rounded-2xl p-6 card-shadow border border-primary/15 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-10 h-10 text-primary/60" strokeWidth={1.5} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{user?.name || "User"}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          {infoCards.map((c, i) => (
            <div key={i} className="flex items-center gap-4 bg-card rounded-2xl p-4 card-shadow">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <c.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">{c.label}</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Profile;
