
import { Card, CardContent } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  BarChart4 
} from "lucide-react";

const FeaturesOverview = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-3">Why Choose DermaVision?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform combines medical expertise with cutting-edge AI technology to provide you with preliminary skin analysis
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover-lift border-primary/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Fast Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Get preliminary skin condition assessments in seconds, not days or weeks
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift border-primary/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <BarChart4 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Advanced AI</h3>
                <p className="text-muted-foreground text-sm">
                  Our algorithms have been trained on thousands of dermatological images
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift border-primary/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Privacy First</h3>
                <p className="text-muted-foreground text-sm">
                  Your images and data are processed securely and never stored without consent
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-lift border-primary/10 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">Medical Guidance</h3>
                <p className="text-muted-foreground text-sm">
                  Clear recommendations on when to seek professional medical advice
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center text-sm text-muted-foreground pt-4">
        <p>
          DermaVision is continuously improving with new research and technology advancements
        </p>
      </div>
    </div>
  );
};

export default FeaturesOverview;
