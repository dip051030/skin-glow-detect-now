
import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}: FeatureCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift transition-all duration-300 border-primary/10 h-full flex flex-col">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex flex-col items-center text-center flex-grow">
          <div className="mb-4 p-3 bg-primary/10 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">{description}</p>
        </div>
        
        {buttonText && (
          <div className="mt-auto pt-4">
            <Button 
              variant="ghost" 
              className="w-full justify-between hover:bg-primary/5 transition-all" 
              onClick={onButtonClick}
            >
              <span>{buttonText}</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
