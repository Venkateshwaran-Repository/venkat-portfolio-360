import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, FileText, File, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface ShowcaseFile {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  category: string;
  created_at: string;
}

const SUPABASE_URL = "https://lxwkuqbjuntqtgigqfwm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4d2t1cWJqdW50cXRnaWdxZndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1OTI1MDQsImV4cCI6MjA4MDE2ODUwNH0.s1R_dOtiToVK2FZ0FzXF0d1tWb8mIigywupqdCini7k";

export const Projects = () => {
  const [files, setFiles] = useState<ShowcaseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/showcase_files?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }

      const data = await response.json();
      setFiles(data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/venkateshwaran-s-756b06201/", "_blank");
  };

  const handleDownloadFile = async (file: ShowcaseFile) => {
    try {
      const downloadUrl = `${SUPABASE_URL}/storage/v1/object/public/showcase-files/${encodeURIComponent(file.storage_path)}`;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Download Started",
        description: `Downloading ${file.name}`,
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download file.",
        variant: "destructive",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'script':
        return <FileText className="w-8 h-8 text-primary" />;
      case 'document':
        return <File className="w-8 h-8 text-blue-500" />;
      case 'config':
        return <FileText className="w-8 h-8 text-orange-500" />;
      default:
        return <File className="w-8 h-8 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Application Packaging Portfolio</h2>
          <p className="text-muted-foreground">Professional scripts, documentation, and resources</p>
        </div>
        <Button onClick={openLinkedIn} variant="outline" className="flex gap-2">
          <Linkedin className="w-4 h-4" />
          Connect on LinkedIn
        </Button>
      </div>

      {/* Files Display Grid */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Portfolio Files ({files.length})
        </h3>
        {loading ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Loading files...</p>
          </Card>
        ) : files.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No files available yet.</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <Card key={file.id} className="hover:shadow-lg transition-all hover:scale-[1.02]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      {getFileIcon(file.file_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 truncate" title={file.name}>
                        {file.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {file.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {formatFileSize(file.file_size)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full text-xs"
                      onClick={() => handleDownloadFile(file)}
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
