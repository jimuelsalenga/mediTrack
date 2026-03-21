import { Navigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import MobileLayout from "./MobileLayout";
import { ShieldAlert } from "lucide-react";

interface Props {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <MobileLayout>
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Access Denied</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You don't have permission to view this page. This area is restricted.
          </p>
        </div>
      </MobileLayout>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
