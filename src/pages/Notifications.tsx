import { Bell, AlertCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const notifications = [
  {
    icon: Bell,
    title: "Verification reminder",
    desc: "Your chest X-ray report is almost ready to submit.",
    time: "2M AGO",
  },
  {
    icon: AlertCircle,
    title: "Health center update",
    desc: "New spring compliance guidance has been posted.",
    time: "TODAY",
  },
];

const Notifications = () => (
  <MobileLayout>
    <div className="px-5 py-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          UI-only previews of student alerts and status reminders.
        </p>
      </div>

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-card rounded-2xl p-4 card-shadow transition-all active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <n.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <span className="text-[10px] font-medium text-muted-foreground tracking-wider whitespace-nowrap">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </MobileLayout>
);

export default Notifications;
