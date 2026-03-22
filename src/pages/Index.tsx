import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
// Import your logo here
import neuLogo from "@/assets/neu-logo.png"; 

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    
    if (success) {
      toast.success("Login successful!");
      navigate("/dashboard"); // Redirects to the RoleRouter/Dashboard
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-blue-600">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <img 
            src={neuLogo} 
            alt="NEU Logo" 
            className="w-24 h-24 object-contain mb-4" 
            onError={(e) => {
              // Fallback if the image doesn't exist yet
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=NEU+Logo";
            }}
          />
          <CardTitle className="text-2xl font-bold text-center">MediTrack</CardTitle>
          <CardDescription className="text-center">
            New Era University Student Medical Record System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email Address</label>
              <Input 
                type="email" 
                placeholder="student@neu.edu.ph" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Use: student@neu.edu.ph / student123
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;