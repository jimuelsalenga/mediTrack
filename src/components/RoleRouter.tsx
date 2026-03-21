import { useAuth } from "@/context/AuthContext";
import Dashboard from "@/pages/Dashboard";
import StudentDashboard from "@/pages/StudentDashboard";

const RoleRouter = () => {
  const { user } = useAuth();

  if (user?.role === "student") {
    return <StudentDashboard />;
  }

  return <Dashboard />;
};

export default RoleRouter;
