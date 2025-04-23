
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const testim = [
  {
    name: "Maria G.",
    text: "DermaVision gave me peace of mind in minutes. The interface is modern and approachable.",
    disease: "checked for: eczema"
  },
  {
    name: "James L.",
    text: "Using this website was easier than expected—my skin analysis was private, instant and clear.",
    disease: "checked for: acne"
  },
  {
    name: "Amira S.",
    text: "As a student, the simple layout and advice helped me understand my symptoms. I’d recommend it to anyone.",
    disease: "checked for: rosacea"
  }
];

const Testimonials = () => (
  <section aria-label="Testimonials" className="max-w-4xl mx-auto py-12">
    <h3 className="text-2xl font-bold mb-7 text-center text-primary/90">What users are saying</h3>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
      {testim.map((t, i) => (
        <Card key={t.name} className="p-6 flex flex-col items-center min-h-[210px] border-primary/15 bg-white/80 shadow-md hover-lift animate-popup" style={{ animationDelay: `${80 + i * 40}ms` }}>
          <div className="w-11 h-11 flex items-center justify-center rounded-full bg-primary/20 mb-4 text-primary font-bold text-lg uppercase shadow-sm">{t.name[0]}</div>
          <div className="text-muted-foreground text-md text-center mb-2">"{t.text}"</div>
          <div className="text-xs text-primary/50 font-semibold lowercase tracking-wide flex items-center gap-1">{t.disease}<ArrowRight className="inline w-4 h-4 -mb-0.5" /></div>
        </Card>
      ))}
    </div>
  </section>
);

export default Testimonials;

