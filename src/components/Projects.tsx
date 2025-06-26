
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Upload, FileText, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { StockAnalysisProposal } from "./StockAnalysisProposal";

export const Projects = () => {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/venkateshwaran-s-756b06201/", "_blank");
  };

  const handlePasswordSubmit = () => {
    if (password === "Venkat@4321") {
      setIsAdmin(true);
      toast({
        title: "Access Granted",
        description: "You now have admin access to view the stock analysis proposal.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
    setPassword("");
  };

  // Show the stock analysis proposal when admin is logged in
  if (isAdmin) {
    return <StockAnalysisProposal />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Project Portfolio</h2>
        <Button onClick={openLinkedIn} variant="outline" className="flex gap-2">
          <Linkedin className="w-4 h-4" />
          Connect on LinkedIn
        </Button>
      </div>

      <Tabs defaultValue="cybersecurity" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="cybersecurity">Cybersecurity Projects</TabsTrigger>
          <TabsTrigger value="packaging">Application Packaging Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="cybersecurity">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Admin Access Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Enter the admin password to access special content:</p>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="flex-1"
                  />
                  <Button onClick={handlePasswordSubmit}>Submit</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Project Showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View the latest cybersecurity projects.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="packaging">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Admin Access Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Enter the admin password to access special content:</p>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="flex-1"
                  />
                  <Button onClick={handlePasswordSubmit}>Submit</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Project Showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View the latest application packaging projects.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
