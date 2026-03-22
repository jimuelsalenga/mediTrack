import { Check, Plus, Headphones, ChevronRight, Clock, CircleCheck, CircleX } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useAuth } from "@/context/AuthContext";
import { useSubmissions, SubmissionStatus } from "@/context/SubmissionsContext";
import { useNavigate } from "react-router-dom";

const statusConfig: Record<SubmissionStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "text-[hsl(var(--urgent))] bg-[hsl(var(--urgent))]/10", icon: Clock },
  approved: { label: "Approved", color: "text-accent bg-accent/10", icon: CircleCheck },
  disapproved: { label: "Disapproved", color: "text-destructive bg-destructive/10", icon: CircleX },
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const { submissions } = useSubmissions();
  const navigate = useNavigate();

  const mySubmissions = submissions.filter((s) => s.studentId === user?.studentId);
  const hasApproved = mySubmissions.some((s) => s.status === "approved");
  const pendingCount = mySubmissions.filter((s) => s.status === "pending").length;

  return (
    <MobileLayout>
      <div className="px-5 py-4 space-y-5">
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Your Status</h1>
          <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">2026</span>
        </div>

        {/* Compliance Card */}
        <div className="gradient-primary rounded-2xl p-5 card-shadow-lg text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
          <p className="text-xs font-medium opacity-80 tracking-wide">Compliance Level</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-4xl font-extrabold leading-tight">
              {hasApproved ? "Approved" : pendingCount > 0 ? "Pending" : "No Records"}
            </span>
            {hasApproved && (
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-accent-foreground" strokeWidth={3} />
              </div>
            )}
          </div>
          {hasApproved && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-accent/90 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              ALL CLEAR
            </div>
          )}
        </div>

        {/* Submission History */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">My Submissions</h2>
          {mySubmissions.length === 0 ? (
            <div className="bg-card rounded-2xl p-6 card-shadow text-center">
              <p className="text-sm text-muted-foreground">No submissions yet. Upload a record to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mySubmissions.map((sub) => {
                const cfg = statusConfig[sub.status];
                const Icon = cfg.icon;
                return (
                  <div key={sub.id} className="bg-card rounded-2xl p-4 card-shadow space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">{sub.fileType}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${cfg.color}`}>
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{sub.fileName} · {sub.submittedAt}</p>
                    {sub.status === "disapproved" && sub.disapprovalReason && (
                      <p className="text-xs text-destructive bg-destructive/5 rounded-lg p-2">
                        Reason: {sub.disapprovalReason}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => navigate("/upload")}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-2xl card-shadow transition-all hover:brightness-110 active:scale-[0.98]"
        >
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
};

export default StudentDashboard;
