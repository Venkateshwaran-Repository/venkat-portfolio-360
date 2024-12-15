import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Upload, FileText } from "lucide-react";

export const Projects = () => {
  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/venkateshwaran-s-756b06201/", "_blank");
  };

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
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Project Upload Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Upload your cybersecurity project documentation and files here.</p>
                <Button variant="outline" className="w-full flex gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Project Files
                </Button>
                <Button variant="outline" className="w-full flex gap-2">
                  <FileText className="w-4 h-4" />
                  Add Google Drive Link
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Project Showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your uploaded cybersecurity projects will appear here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="packaging">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Project Upload Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Upload your application packaging project documentation and files here.</p>
                <Button variant="outline" className="w-full flex gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Project Files
                </Button>
                <Button variant="outline" className="w-full flex gap-2">
                  <FileText className="w-4 h-4" />
                  Add Google Drive Link
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Project Showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your uploaded application packaging projects will appear here.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};