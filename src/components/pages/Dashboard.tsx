import { Check, Plus, Headphones, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const Dashboard = () => (
  <MobileLayout>
    <div className="px-5 py-4 space-y-5">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Your Status</h1>
        <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">Spring 2024</span>
      </div>

      {/* Compliance Card */}
      <div className="gradient-primary rounded-2xl p-5 card-shadow-lg text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
        <p className="text-xs font-medium opacity-80 tracking-wide">Compliance Level</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-4xl font-extrabold leading-tight">Approved</span>
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-accent-foreground" strokeWidth={3} />
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 bg-accent/90 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
          <Check className="w-3.5 h-3.5" strokeWidth={3} />
          ALL CLEAR
        </div>
      </div>

      {/* Active Requirements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground">Active Requirements</h2>
          <button className="text-sm font-medium text-primary">View History</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <RequirementCard
            icon="🫁"
            title="X-Ray"
            desc="Annual Chest Scan Requirement"
            tag="DUE IN 12D"
            tagColor="text-primary"
          />
          <RequirementCard
            icon="🩺"
            title="Physical Exam"
            desc="Routine Wellness Clearance"
            tag="URGENT"
            tagColor="text-destructive"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-2xl card-shadow transition-all hover:brightness-110 active:scale-[0.98]">
        <Plus className="w-5 h-5" />
        Submit New Record
      </button>

      {/* Help Banner */}
      <button className="w-full flex items-center gap-3 bg-card rounded-2xl p-4 card-shadow text-left transition-all active:scale-[0.98]">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <Headphones className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">Need assistance?</p>
          <p className="text-xs text-muted-foreground">Connect with Health Services Portal</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
      </button>
    </div>
  </MobileLayout>
);

const RequirementCard = ({
  icon,
  title,
  desc,
  tag,
  tagColor,
}: {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
}) => (
  <div className="bg-card rounded-xl p-4 card-shadow flex flex-col gap-2">
    <span className="text-2xl">{icon}</span>
    <p className="text-sm font-semibold text-foreground">{title}</p>
    <p className="text-[11px] text-muted-foreground leading-snug">{desc}</p>
    <span className={`text-[11px] font-bold ${tagColor} mt-auto`}>{tag}</span>
  </div>
);

export default Dashboard;
