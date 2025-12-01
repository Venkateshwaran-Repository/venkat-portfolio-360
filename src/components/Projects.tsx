
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Upload, FileText, File, Download, Trash2, LogOut, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface ShowcaseFile {
  id: string;
  name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  category: string;
  created_at: string;
}

export const Projects = () => {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<ShowcaseFile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check current user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Load files
    loadFiles();

    return () => subscription.unsubscribe();
  }, []);

  const loadFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('showcase_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload files.",
        variant: "destructive",
      });
      return;
    }

    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    try {
      for (const file of Array.from(uploadedFiles)) {
        // Upload to storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('showcase-files')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save metadata to database
        const { error: dbError } = await supabase
          .from('showcase_files')
          .insert({
            name: file.name,
            file_type: getFileType(file.name),
            file_size: file.size,
            storage_path: fileName,
            category: getCategoryFromFileName(file.name),
            uploaded_by: user.id
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Files Uploaded",
        description: `${uploadedFiles.length} file(s) uploaded successfully.`,
      });

      // Reload files
      await loadFiles();
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload files. Please try again.",
        variant: "destructive",
      });
    }

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

  const handleDeleteFile = async (file: ShowcaseFile) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to delete files.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('showcase-files')
        .remove([file.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('showcase_files')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      toast({
        title: "File Deleted",
        description: "File removed successfully.",
      });

      await loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete file.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadFile = async (file: ShowcaseFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('showcase-files')
        .download(file.storage_path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

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
        <div className="flex gap-2">
          <Button onClick={openLinkedIn} variant="outline" className="flex gap-2">
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
          </Button>
          {user ? (
            <Button onClick={handleLogout} variant="outline" className="flex gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/auth")} variant="default" className="flex gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Button>
          )}
        </div>
      </div>

      {/* File Upload Section - Only visible to authenticated users */}
      {user && (
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
      )}

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
            <p className="text-muted-foreground">
              {user 
                ? "No files uploaded yet. Upload your first file to get started!" 
                : "No files available yet."}
            </p>
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
                  {user && (
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDeleteFile(file)}
                      className="text-xs"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
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
