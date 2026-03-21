import { CloudUpload, FileText, ShieldCheck } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";

const Upload = () => (
  <MobileLayout>
    <div className="px-5 py-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Records</h1>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Securely store your medical imaging and diagnostics for verification by the health center.
        </p>
      </div>

      {/* Drop Zone */}
      <div className="border-2 border-dashed border-primary/40 rounded-2xl p-8 flex flex-col items-center gap-3 bg-primary/[0.03]">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <CloudUpload className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm font-semibold text-foreground text-center">
          Drop or Upload your X-Ray Report
        </p>
        <p className="text-xs text-muted-foreground">Supports PDF, JPG, or PNG (Max 15MB)</p>
      </div>

      {/* Status Card */}
      <div className="bg-card rounded-2xl p-5 card-shadow space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Current Status</span>
          <span className="text-[10px] font-semibold text-muted-foreground tracking-wider">ID: 44291-X</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-urgent" />
          <span className="text-sm font-semibold text-foreground">Pending Submission</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">chest_xray_final.pdf</span>
          </div>
          <span className="text-sm font-semibold text-primary">85%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: "85%" }} />
        </div>
        <p className="text-[11px] text-muted-foreground">Encrypting and uploading to secure vault...</p>
      </div>

      {/* Submit Button */}
      <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-2xl card-shadow transition-all hover:brightness-110 active:scale-[0.98]">
        <ShieldCheck className="w-5 h-5" />
        Submit for Verification
      </button>
    </div>
  </MobileLayout>
);

export default Upload;
