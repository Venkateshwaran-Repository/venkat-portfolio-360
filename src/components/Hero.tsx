import { Shield, Package, Cog } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-primary text-primary-foreground p-8">
      <div className="container max-w-4xl animate-slideIn">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          S. Venkateshwaran
        </h1>
        <h2 className="text-2xl md:text-3xl text-secondary mb-8">
          IT Analyst & Cybersecurity Specialist
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl">
          A visionary IT professional with 4+ years of experience in application packaging,
          deployment, and cybersecurity. Committed to driving digital transformation
          and enhancing organizational security.
        </p>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent" />
            <span>Cybersecurity</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-accent" />
            <span>Application Packaging</span>
          </div>
          <div className="flex items-center gap-2">
            <Cog className="w-6 h-6 text-accent" />
            <span>Automation</span>
          </div>
        </div>
      </div>
    </section>
  );
};