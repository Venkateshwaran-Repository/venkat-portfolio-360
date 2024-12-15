import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Certifications = () => {
  const certifications = [
    {
      title: "Application Packaging Training with AdminStudio and InstallShield",
      provider: "Udemy",
      date: "Feb 2024"
    },
    {
      title: "Application Packaging Training",
      provider: "Udemy",
      date: "Jan 2024"
    },
    {
      title: "Python Essential Training",
      provider: "LinkedIn Learning",
      date: "Sep 2023"
    },
    // ... Add more certifications as needed
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
      {certifications.map((cert, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{cert.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {cert.provider} • {cert.date}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};