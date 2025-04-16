
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, Search, AlertCircle } from "lucide-react";

const UploadGuide = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-secondary/20">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4 text-center">How It Works</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <UploadCloud className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Upload a clear image</p>
              <p className="text-sm text-muted-foreground">
                Take a well-lit photo of the affected skin area or upload an existing image
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Search className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">AI analysis</p>
              <p className="text-sm text-muted-foreground">
                Our algorithm analyzes the image to detect potential skin conditions
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Get preliminary assessment</p>
              <p className="text-sm text-muted-foreground">
                Review detection results and recommendations for next steps
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
          Note: This tool provides preliminary information only and is not a substitute for professional medical advice.
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadGuide;
