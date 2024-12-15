import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WorkExperience = () => {
  const experiences = [
    {
      title: "IT Analyst",
      company: "Tata Consultancy Services",
      period: "August 2024 - Present",
      location: "Chennai, Tamil Nadu, India"
    },
    {
      title: "System Engineer",
      company: "Tata Consultancy Services",
      period: "February 2022 - August 2024",
      location: "Chennai"
    },
    {
      title: "Assistant System Engineer",
      company: "Tata Consultancy Services",
      period: "February 2021 - February 2022",
      location: "India"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Professional Experience</h2>
        <p className="text-muted-foreground">4 years of expertise in IT and Application Management</p>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{exp.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {exp.company} • {exp.period} • {exp.location}
              </p>
            </CardHeader>
          </Card>
        ))}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              As a visionary and innovative IT Analyst with 4 years of expertise in Application Discovery, Re-Packaging, and SCCM deployment, I excel in optimizing technological solutions. With a proven track record of driving digital transformation, I seek a dynamic and challenging environment that fosters professional evolution and career advancement.
            </p>

            <div>
              <h4 className="font-medium mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Successfully developed over 470+ Application Packages with a 90% Production go-ahead rate</li>
                <li>Led Windows migration project transitioning ~400 packages across Windows 7, 10, and 11</li>
                <li>Managed team of 12+ members while maintaining high quality standards</li>
                <li>Implemented automation solutions using VBScript, PowerShell, and Batch scripting</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Technical Expertise:</h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>SCCM Operations and Software Distribution</li>
                <li>Application Packaging and Deployment using InstallShield AdminStudio</li>
                <li>Advanced Scripting and Automation</li>
                <li>MSI Tables, File System, and Registry customization</li>
                <li>Quality Assurance and Testing</li>
                <li>Cybersecurity and Ethical Hacking</li>
                <li>Python Programming and AI Implementation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};