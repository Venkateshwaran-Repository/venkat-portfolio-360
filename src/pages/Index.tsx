import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Certifications } from "@/components/Certifications";
import { WorkExperience } from "@/components/WorkExperience";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="experience">Work Experience</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <Skills />
          </TabsContent>
          <TabsContent value="certifications">
            <Certifications />
          </TabsContent>
          <TabsContent value="experience">
            <WorkExperience />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Index;