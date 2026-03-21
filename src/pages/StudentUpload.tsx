import { useState, useCallback } from "react";
import { CloudUpload, FileText, ShieldCheck, X, Image } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { useAuth } from "@/context/AuthContext";
import { useSubmissions } from "@/context/SubmissionsContext";
import { toast } from "sonner";

const FILE_TYPES = ["X-Ray", "Physical Exam", "Vaccination Record"];

const StudentUpload = () => {
  const { user } = useAuth();
  const { addSubmission } = useSubmissions();

  const [fullName, setFullName] = useState(user?.name || "");
  const [studentId, setStudentId] = useState(user?.studentId || "");
  const [fileType, setFileType] = useState(FILE_TYPES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = useCallback((f: File) => {
    const maxSize = 15 * 1024 * 1024;
    if (f.size > maxSize) { toast.error("File exceeds 15MB limit."); return; }
    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(f.type)) { toast.error("Only PDF, JPG, or PNG files are supported."); return; }
    setFile(f);
    setProgress(0);
    setUploading(false);
    if (f.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const clearFile = () => { setFile(null); setPreview(null); setProgress(0); setUploading(false); };

  const handleSubmit = () => {
    if (!fullName.trim() || !studentId.trim()) { toast.error("Please fill in your name and student ID."); return; }
    if (!file) { toast.error("Please upload a file first."); return; }
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setUploading(false);
          addSubmission({
            studentName: fullName.trim(),
            studentId: studentId.trim(),
            fileType,
            fileName: file.name,
            fileSizeMB: (file.size / 1024 / 1024).toFixed(1),
          });
          toast.success("File submitted successfully. Awaiting Admin review.");
          setFile(null);
          setPreview(null);
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  return (
    <MobileLayout>
      <div className="px-5 py-4 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Upload Records</h1>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Securely submit your medical files for verification by the health center.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">Student ID</label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. STU-44291"
              className="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">File Type</label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {FILE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Drop Zone */}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all ${
            dragActive ? "border-primary bg-primary/10" : "border-primary/40 bg-primary/[0.03]"
          }`}
        >
          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={onFileInput} className="hidden" />
          {preview ? (
            <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-xl" />
          ) : file ? (
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CloudUpload className="w-6 h-6 text-primary" />
            </div>
          )}
          {file ? (
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold text-foreground text-center">Drop or Upload your file</p>
              <p className="text-xs text-muted-foreground">Supports PDF, JPG, or PNG (Max 15MB)</p>
            </>
          )}
        </label>

        {file && (
          <button onClick={clearFile} className="flex items-center gap-1 text-xs text-destructive font-medium mx-auto">
            <X className="w-3.5 h-3.5" /> Remove file
          </button>
        )}

        {/* Progress */}
        {uploading && (
          <div className="bg-card rounded-2xl p-4 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {file?.type.startsWith("image/") ? <Image className="w-4 h-4 text-muted-foreground" /> : <FileText className="w-4 h-4 text-muted-foreground" />}
                <span className="text-sm text-foreground truncate max-w-[200px]">{file?.name}</span>
              </div>
              <span className="text-sm font-semibold text-primary">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[11px] text-muted-foreground">Encrypting and uploading to secure vault...</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!file || uploading}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3.5 rounded-2xl card-shadow transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        >
          {uploading ? (
            <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <ShieldCheck className="w-5 h-5" />
          )}
          {uploading ? "Processing..." : "Submit for Verification"}
        </button>
      </div>
    </MobileLayout>
  );
};

export default StudentUpload;
