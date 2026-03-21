import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { SubmissionsProvider } from "@/context/SubmissionsContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import StudentDashboard from "@/pages/StudentDashboard";
import StudentUpload from "@/pages/StudentUpload";
import AdminQueue from "@/pages/AdminQueue";
import Upload from "@/pages/Upload";
import Notifications from "@/pages/Notifications";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";
import RoleRouter from "@/components/RoleRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <SubmissionsProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><RoleRouter /></ProtectedRoute>} />
              <Route path="/upload" element={<ProtectedRoute allowedRoles={["student", "staff"]}><StudentUpload /></ProtectedRoute>} />
              <Route path="/admin/queue" element={<ProtectedRoute allowedRoles={["admin"]}><AdminQueue /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SubmissionsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
