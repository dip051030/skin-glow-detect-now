
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  ArrowLeft, 
  Microscope, 
  Users, 
  HeartPulse, 
  Medal
} from "lucide-react";
import TeamMember from "@/components/TeamMember";
import FeatureCard from "@/components/FeatureCard";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-6 border-b border-border bg-card/50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Derma<span className="text-primary">Vision</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-primary font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-16">
          <Link 
            to="/" 
            className="inline-flex items-center mb-8 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>

          <div className="space-y-6 animate-fade-in">
            <div className="relative">
              <div className="absolute -z-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70 -top-10 -left-10"></div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter relative">
                About DermaVision
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              DermaVision uses advanced artificial intelligence to help identify potential skin conditions. Our mission is to make preliminary skin analysis accessible to everyone while encouraging proper medical consultation.
            </p>
          </div>
        </div>

        <section className="mb-24 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h2 className="text-3xl font-bold text-center mb-12">Our Approach</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Microscope className="h-8 w-8 text-primary" />}
              title="Advanced AI Technology"
              description="Our platform utilizes state-of-the-art computer vision algorithms to analyze skin conditions with high accuracy."
            />
            <FeatureCard 
              icon={<HeartPulse className="h-8 w-8 text-primary" />}
              title="Health-Focused"
              description="We prioritize user well-being by providing educational content alongside our skin analysis tools."
            />
            <FeatureCard 
              icon={<Medal className="h-8 w-8 text-primary" />}
              title="Research-Backed"
              description="Our models are continuously trained and improved based on dermatological research and clinical data."
            />
          </div>
        </section>

        <section className="mb-24 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-3xl font-bold text-center mb-4">Our Team</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            DermaVision is built by a dedicated team of healthcare professionals, AI researchers, and engineers committed to improving skin health awareness.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember 
              name="Dr. Emma Chen"
              role="Medical Director"
              bio="Board-certified dermatologist with over 15 years of clinical experience."
              imageIndex={1}
            />
            <TeamMember 
              name="Michael Rodriguez"
              role="AI Research Lead"
              bio="PhD in Computer Vision with expertise in medical image processing algorithms."
              imageIndex={2}
            />
            <TeamMember 
              name="Sarah Johnson"
              role="Product Designer"
              bio="UX specialist focused on creating accessible healthcare technology interfaces."
              imageIndex={3}
            />
          </div>
        </section>

        <section className="mb-24 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Important Disclaimer</h2>
                <p className="text-muted-foreground mb-6">
                  DermaVision is designed as an educational tool to increase awareness about skin health. Our AI analysis provides preliminary information only and should not be considered a medical diagnosis.
                </p>
                <p className="font-medium mb-6">
                  Always consult with a qualified healthcare professional for proper diagnosis and treatment of any medical condition.
                </p>
                <Link to="/">
                  <Button className="animate-scale-up">
                    Try DermaVision
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="py-8 border-t border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium">DermaVision</span>
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground text-center md:text-right">
              © {new Date().getFullYear()} DermaVision. All Rights Reserved.
            </p>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-4">
            For educational purposes. Not a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
