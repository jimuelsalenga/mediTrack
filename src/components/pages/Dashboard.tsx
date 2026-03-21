import { Check, Plus, Headphones, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const Dashboard = () => {
  // Logic to get the current user's name from your AuthContext
  // For now, it stays as the student view
  
  return (
    <MobileLayout>
      <div className="px-5 py-4 space-y-5 pb-24">
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Your Status</h1>
          <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase bg-secondary px-2 py-1 rounded">
            2nd SEM 2025-2026
          </span>
        </div>

        {/* Compliance Card - Styled with NEU Blue */}
        <div className="bg-[#0038A8] rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
          {/* Decorative Circle for Glassmorphism effect */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
          
          <p className="text-xs font-medium opacity-80 tracking-wide">Compliance Level</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-4xl font-extrabold leading-tight">Approved</span>
            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
              <Check className="w-6 h-6 text-emerald-900" strokeWidth={3} />
            </div>
          </div>
          
          <div className="mt-4 inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30">
            <Check className="w-3 h-3" strokeWidth={3} />
            MEDICAL CLEARANCE ACTIVE
          </div>
        </div>

        {/* Active Requirements Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">Active Requirements</h2>
            <button className="text-xs font-bold text-[#0038A8] hover:underline">View History</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <RequirementCard
              icon="🫁"
              title="X-Ray"
              desc="Annual Chest Scan Requirement"
              tag="DUE IN 12D"
              tagColor="text-blue-600"
            />
            <RequirementCard
              icon="🩺"
              title="Physical Exam"
              desc="Routine Wellness Clearance"
              tag="URGENT"
              tagColor="text-red-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-[#0038A8] text-white font-bold py-4 rounded-2xl shadow-lg transition-all hover:bg-[#002d86] active:scale-[0.97]">
          <Plus className="w-5 h-5" />
          Submit New Record
        </button>

        {/* Help Banner */}
        <button className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl p-4 shadow-sm text-left transition-all active:scale-[0.98]">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5 text-slate-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground">Need assistance?</p>
            <p className="text-xs text-muted-foreground">Connect with NEU Health Services</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </button>
      </div>
    </MobileLayout>
  );
};

// Reusable Card Component
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
  <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col gap-2 hover:border-[#0038A8] transition-colors">
    <span className="text-2xl">{icon}</span>
    <div>
      <p className="text-sm font-bold text-foreground leading-tight">{title}</p>
      <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{desc}</p>
    </div>
    <span className={`text-[10px] font-black ${tagColor} mt-auto pt-2`}>{tag}</span>
  </div>
);

export default Dashboard;