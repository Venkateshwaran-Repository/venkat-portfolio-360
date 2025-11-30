
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Upload, FileText, File, Download, Trash2, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { StockAnalysisProposal } from "./StockAnalysisProposal";
import { StockAnalysisPlatform } from "./StockAnalysisPlatform";
import { Badge } from "@/components/ui/badge";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  category: string;
  fileData?: string; // base64 data URL for the actual file content
  file?: File; // store the actual file object
}

export const Projects = () => {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPlatform, setShowPlatform] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const openLinkedIn = () => {
    window.open("https://www.linkedin.com/in/venkateshwaran-s-756b06201/", "_blank");
  };

  const handlePasswordSubmit = () => {
    if (password === "Venkat@4321") {
      setIsAdmin(true);
      toast({
        title: "Access Granted",
        description: "You now have admin access to view the stock analysis content.",
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

  const handleShowPlatform = () => {
    setShowPlatform(true);
  };

  const handleBackToProposal = () => {
    setShowPlatform(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const filePromises = Array.from(files).map((file) => {
        return new Promise<UploadedFile>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              name: file.name,
              type: getFileType(file.name),
              size: file.size,
              uploadDate: new Date(),
              category: getCategoryFromFileName(file.name),
              fileData: e.target?.result as string,
              file: file
            });
          };
          reader.readAsDataURL(file);
        });
      });

      const newFiles = await Promise.all(filePromises);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      toast({
        title: "Files Uploaded",
        description: `${files.length} file(s) uploaded successfully.`,
      });
    }
    // Reset the input so the same file can be uploaded again if needed
    event.target.value = '';
  };

  const getFileType = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['ps1', 'py', 'sh', 'bat'].includes(ext || '')) return 'script';
    if (['pdf', 'docx', 'txt', 'md'].includes(ext || '')) return 'document';
    if (['xml', 'json', 'yaml', 'yml'].includes(ext || '')) return 'config';
    return 'other';
  };

  const getCategoryFromFileName = (fileName: string) => {
    const name = fileName.toLowerCase();
    if (name.includes('powershell') || name.endsWith('.ps1')) return 'PowerShell';
    if (name.includes('sccm') || name.includes('deployment')) return 'SCCM';
    if (name.includes('intune')) return 'Intune';
    if (name.includes('config')) return 'Configuration';
    if (name.includes('doc') || name.endsWith('.pdf')) return 'Documentation';
    return 'General';
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
    toast({
      title: "File Deleted",
      description: "File removed successfully.",
    });
  };

  const handleDownloadFile = (file: UploadedFile) => {
    if (file.fileData) {
      // Create a temporary link element and trigger download
      const link = document.createElement('a');
      link.href = file.fileData;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Downloading ${file.name}`,
      });
    } else {
      toast({
        title: "Download Failed",
        description: "File data not available.",
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

  // Show the stock analysis platform when requested
  if (isAdmin && showPlatform) {
    return <StockAnalysisPlatform onBack={handleBackToProposal} />;
  }

  // Show the stock analysis proposal when admin is logged in
  if (isAdmin) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button onClick={() => setIsAdmin(false)} variant="outline">
            Back to Projects
          </Button>
          <Button onClick={handleShowPlatform} className="bg-green-600 hover:bg-green-700">
            Launch Demo Platform
          </Button>
        </div>
        <StockAnalysisProposal />
      </div>
    );
  }

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

      {/* File Upload Section */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Upload scripts, documentation, configuration files, and other resources
              </p>
              <p className="text-xs text-muted-foreground">
                Supported: .ps1, .py, .sh, .pdf, .docx, .xml, .json, and more
              </p>
            </div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button asChild>
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Choose Files
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Files Display Grid */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Uploaded Files ({uploadedFiles.length})
        </h3>
        {uploadedFiles.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No files uploaded yet. Upload your first file to get started!</p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {uploadedFiles.map((file) => (
            <Card key={file.id} className="hover:shadow-lg transition-all hover:scale-[1.02]">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    {getFileIcon(file.type)}
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
                        {formatFileSize(file.size)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {file.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 text-xs"
                    onClick={() => handleDownloadFile(file)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDeleteFile(file.id)}
                    className="text-xs"
                  >
                    <Trash2 className="w-3 h-3" />
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
