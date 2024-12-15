import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WorkExperience = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>IT Analyst</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Key Achievements:</h4>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>Successfully created, repackaged, and deployed over 470 application packages with a 90% production go-ahead rate</li>
              <li>Led Windows migration project transitioning ~400 packages from Windows 7 to 10/11</li>
              <li>Managed team of 12+ members while maintaining high quality standards</li>
              <li>Implemented automation solutions using VBScript, PowerShell, and Batch scripting</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Technical Skills:</h4>
            <ul className="list-disc list-inside mt-2 space-y-2 text-muted-foreground">
              <li>SCCM Operations and Software Distribution</li>
              <li>Application Packaging and Deployment</li>
              <li>Scripting and Automation</li>
              <li>Quality Assurance and Testing</li>
              <li>Vendor Management</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};