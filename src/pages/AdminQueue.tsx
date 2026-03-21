import { useState } from "react";
import { CircleCheck, CircleX, History, Clock, FileText } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useSubmissions, Submission } from "@/context/SubmissionsContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const AdminQueue = () => {
  const { submissions, approveSubmission, disapproveSubmission } = useSubmissions();
  const [disapproveTarget, setDisapproveTarget] = useState<Submission | null>(null);
  const [reason, setReason] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const pending = submissions.filter((s) => s.status === "pending");
  const archived = submissions.filter((s) => s.status !== "pending");

  const handleApprove = (sub: Submission) => {
    approveSubmission(sub.id);
    toast.success(`File for ${sub.studentName} Approved.`);
  };

  const handleDisapprove = () => {
    if (!disapproveTarget || !reason.trim()) {
      toast.error("Please provide a reason for disapproval.");
      return;
    }
    disapproveSubmission(disapproveTarget.id, reason.trim());
    toast.warning(`File for ${disapproveTarget.studentName} Disapproved.`);
    setDisapproveTarget(null);
    setReason("");
  };

  return (
    <MobileLayout>
      <div className="px-5 py-4 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Verification Queue</h1>
            <p className="text-sm text-muted-foreground mt-1">Review and process student submissions.</p>
          </div>
          <button
            onClick={() => setShowHistory(true)}
            className="text-sm font-medium text-primary flex items-center gap-1"
          >
            <History className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Pending Queue */}
        {pending.length === 0 ? (
          <div className="bg-card rounded-2xl p-8 card-shadow text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <CircleCheck className="w-6 h-6 text-accent" />
            </div>
            <p className="text-sm font-semibold text-foreground">All clear!</p>
            <p className="text-xs text-muted-foreground">No pending submissions to review.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((sub) => (
              <div key={sub.id} className="bg-card rounded-2xl p-4 card-shadow space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{sub.studentName}</p>
                    <p className="text-xs text-muted-foreground">{sub.studentId} · {sub.submittedAt}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[hsl(var(--urgent))] bg-[hsl(var(--urgent))]/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Pending
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-secondary rounded-xl p-3">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">{sub.fileName}</p>
                    <p className="text-[10px] text-muted-foreground">{sub.fileType} · {sub.fileSizeMB} MB</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleApprove(sub)}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="sm"
                  >
                    <CircleCheck className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => { setDisapproveTarget(sub); setReason(""); }}
                    variant="destructive"
                    className="flex-1"
                    size="sm"
                  >
                    <CircleX className="w-4 h-4 mr-1" />
                    Disapprove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Disapprove Reason Dialog */}
      <Dialog open={!!disapproveTarget} onOpenChange={(open) => { if (!open) setDisapproveTarget(null); }}>
        <DialogContent className="max-w-[400px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Disapprove Submission</DialogTitle>
            <DialogDescription>
              Provide a reason for disapproving {disapproveTarget?.studentName}'s {disapproveTarget?.fileType}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a reason...</option>
                <option>Invalid file format</option>
                <option>Image unclear or low resolution</option>
                <option>Wrong document type submitted</option>
                <option>Missing required information</option>
                <option>Document expired</option>
              </select>
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Or type a custom reason..."
              className="w-full h-20 rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <Button onClick={handleDisapprove} variant="destructive" className="w-full">
              Confirm Disapproval
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="max-w-[420px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Archived Submissions
            </DialogTitle>
            <DialogDescription>Previously reviewed submissions.</DialogDescription>
          </DialogHeader>
          <div className="overflow-auto max-h-[350px]">
            {archived.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No archived submissions yet.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Student</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archived.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="text-xs">
                        <p className="font-medium">{s.studentName}</p>
                        <p className="text-muted-foreground">{s.studentId}</p>
                      </TableCell>
                      <TableCell className="text-xs">{s.fileType}</TableCell>
                      <TableCell>
                        <span className={`text-[10px] font-bold ${s.status === "approved" ? "text-accent" : "text-destructive"}`}>
                          {s.status === "approved" ? "Approved" : "Disapproved"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default AdminQueue;
