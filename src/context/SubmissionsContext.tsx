import { createContext, useContext, useState, ReactNode } from "react";

export type SubmissionStatus = "pending" | "approved" | "disapproved";

export interface Submission {
  id: string;
  studentName: string;
  studentId: string;
  fileType: string;
  fileName: string;
  fileSizeMB: string;
  status: SubmissionStatus;
  submittedAt: string;
  disapprovalReason?: string;
}

interface SubmissionsContextType {
  submissions: Submission[];
  addSubmission: (sub: Omit<Submission, "id" | "status" | "submittedAt">) => void;
  approveSubmission: (id: string) => void;
  disapproveSubmission: (id: string, reason: string) => void;
}

const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: "SUB-001",
    studentName: "Maya Bennett",
    studentId: "23-00000-000",
    fileType: "X-Ray",
    fileName: "chest_xray_final.pdf",
    fileSizeMB: "2.4",
    status: "pending",
    submittedAt: "Mar 18, 2026",
  },
  {
    id: "SUB-002",
    studentName: "James Rivera",
    studentId: "23-00000-000",
    fileType: "Physical Exam",
    fileName: "physical_exam_spring.pdf",
    fileSizeMB: "1.1",
    status: "pending",
    submittedAt: "Mar 17, 2026",
  },
  {
    id: "SUB-003",
    studentName: "Aisha Patel",
    studentId: "23-00000-000",
    fileType: "Vaccination Record",
    fileName: "vaccination_record.jpg",
    fileSizeMB: "0.8",
    status: "approved",
    submittedAt: "Mar 10, 2026",
  },
  {
    id: "SUB-004",
    studentName: "Carlos Diaz",
    studentId: "23-00000-000",
    fileType: "X-Ray",
    fileName: "xray_scan.png",
    fileSizeMB: "3.2",
    status: "disapproved",
    submittedAt: "Mar 5, 2026",
    disapprovalReason: "Image unclear — please resubmit a higher resolution scan.",
  },
];

const SubmissionsContext = createContext<SubmissionsContextType | null>(null);

let nextId = 5;

export const SubmissionsProvider = ({ children }: { children: ReactNode }) => {
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);

  const addSubmission = (sub: Omit<Submission, "id" | "status" | "submittedAt">) => {
    const newSub: Submission = {
      ...sub,
      id: `SUB-${String(nextId++).padStart(3, "0")}`,
      status: "pending",
      submittedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const approveSubmission = (id: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "approved" as const } : s))
    );
  };

  const disapproveSubmission = (id: string, reason: string) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "disapproved" as const, disapprovalReason: reason } : s
      )
    );
  };

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission, approveSubmission, disapproveSubmission }}>
      {children}
    </SubmissionsContext.Provider>
  );
};

export const useSubmissions = () => {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) throw new Error("useSubmissions must be used within SubmissionsProvider");
  return ctx;
};
