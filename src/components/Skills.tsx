import { Computer, Shield, Package, Cog, Users, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const skills = [
  {
    name: "Application Packaging",
    level: 95,
    icon: Package,
    description: "Expert in InstallShield, AdminStudio, and SCCM deployment",
  },
  {
    name: "Cybersecurity",
    level: 90,
    icon: Shield,
    description: "Comprehensive knowledge of security practices and ethical hacking",
  },
  {
    name: "IT Operations",
    level: 92,
    icon: Computer,
    description: "Proficient in system administration and troubleshooting",
  },
  {
    name: "Automation",
    level: 88,
    icon: Cog,
    description: "Skilled in VBScript, PowerShell, and process automation",
  },
  {
    name: "Team Leadership",
    level: 85,
    icon: Users,
    description: "Led teams of 12+ members in complex projects",
  },
  {
    name: "Project Management",
    level: 87,
    icon: Award,
    description: "Successfully managed large-scale migration projects",
  },
];

export const Skills = () => {
  return (
    <section className="py-20 bg-white" id="skills">
      <div className="container">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">
          Core Competencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="p-6 rounded-lg border border-gray-200 hover:border-secondary transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <skill.icon className="w-6 h-6 text-secondary" />
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{skill.description}</p>
              <Progress value={skill.level} className="h-2" />
              <span className="text-sm text-gray-500 mt-2 block">
                {skill.level}% Proficiency
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};