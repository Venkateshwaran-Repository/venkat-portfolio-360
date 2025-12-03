import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const ALLOWED_EMAIL = "venkatappu.tkp@gmail.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email !== ALLOWED_EMAIL) {
      toast({
        title: "Access Denied",
        description: "You are not authorized to access this system.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      // Try to login first
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        // If login fails, try to create account (one-time setup)
        if (loginError.message.includes("Invalid login credentials")) {
          const { error: signupError } = await supabase.auth.signUp({
            email,
            password,
          });

          if (signupError) {
            if (signupError.message.includes("already registered")) {
              throw new Error("Account exists but password is incorrect. Contact admin.");
            }
            throw signupError;
          }

          // Auto-confirm is enabled, so try login again
          const { error: retryError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (retryError) {
            throw retryError;
          }
        } else {
          throw loginError;
        }
      }

      toast({
        title: "Success!",
        description: "Logged in successfully.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
