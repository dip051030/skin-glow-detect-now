
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { DetectionResult as DetectionResultType } from "@/lib/imageProcessor";

interface DetectionResultProps {
  result: DetectionResultType;
  previewUrl: string | null;
}

const DetectionResult = ({ result, previewUrl }: DetectionResultProps) => {
  const { name, confidence, description, severity, recommendation } = result;

  // Determine severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'severe':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  // Format confidence as percentage
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="animate-fade-in">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="bg-accent pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <Badge variant="outline" className={`${getSeverityColor(severity)} ml-2`}>
              {severity}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-4">
          {previewUrl && (
            <div className="mb-4 rounded-md overflow-hidden border border-border">
              <img 
                src={previewUrl} 
                alt="Analyzed skin" 
                className="w-full h-32 object-cover"
              />
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Confidence</span>
                <span className="text-sm font-medium">{confidencePercent}%</span>
              </div>
              <Progress 
                value={confidencePercent} 
                className="h-2" 
              />
            </div>
            
            <div className="bg-secondary/30 p-3 rounded-md flex gap-3">
              {confidence > 0.7 ? (
                <CheckCircle className="text-green-500 h-5 w-5 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="text-yellow-500 h-5 w-5 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium mb-1">Recommendation</p>
                <p className="text-sm text-muted-foreground">{recommendation}</p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-4 italic">
              This is a preliminary assessment for educational purposes only. 
              Please consult a dermatologist for professional medical advice.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetectionResult;
