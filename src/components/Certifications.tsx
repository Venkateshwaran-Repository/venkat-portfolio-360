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
    {
      title: "Learn Ethical Hacking from Scratch",
      provider: "Udemy",
      date: "Jul 2023"
    },
    {
      title: "The Ultimate Dark Web, Anonymity, Privacy & Security Course",
      provider: "Udemy",
      date: "Jul 2023"
    },
    {
      title: "Cybersecurity Awareness: Security Overview",
      provider: "LinkedIn Learning",
      date: "Jan 2023"
    },
    {
      title: "Cybersecurity for IT Professionals",
      provider: "LinkedIn Learning",
      date: "Jan 2023"
    },
    {
      title: "Cyber Hygiene Practices",
      provider: "Ministry of Electronics and Information Technology",
      date: "Sep 2022"
    },
    {
      title: "Deep Web: The Complete Introduction to the Hidden Web",
      provider: "Udemy",
      date: "Aug 2022"
    },
    {
      title: "Zoho CRM Complete Course",
      provider: "Udemy",
      date: "Jun 2022"
    },
    {
      title: "Computer Forensics Fundamentals",
      provider: "Udemy",
      date: "May 2022"
    },
    {
      title: "Ethical Hacking: Social Engineering",
      provider: "LinkedIn Learning",
      date: "May 2022"
    },
    {
      title: "AI Beginner Foundation Curriculum",
      provider: "Tata Consultancy Services",
      date: "Apr 2022"
    },
    {
      title: "Computer Forensics File Formats: Why You Should be Using AFF4",
      provider: "Cybrary",
      date: "Mar 2022"
    },
    {
      title: "Introduction to IT & Cybersecurity",
      provider: "Cybrary",
      date: "Mar 2022"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Professional Certifications</h2>
        <p className="text-muted-foreground">Over 30 certifications in IT, Cybersecurity, and Application Development</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};