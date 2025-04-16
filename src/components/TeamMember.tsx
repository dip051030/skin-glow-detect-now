
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageIndex: number;
  email?: string;
}

const TeamMember = ({ name, role, bio, imageIndex, email }: TeamMemberProps) => {
  // Generate different placeholder images based on the index
  const getPlaceholderImage = (index: number) => {
    const colors = [
      "4CAF50", // green
      "2E7D32", // dark green
      "81C784"  // light green
    ];
    const color = colors[index % colors.length];
    return `https://placehold.co/300x300/${color}/FFFFFF/png?text=${name.charAt(0)}`;
  };

  return (
    <Card className="overflow-hidden hover-lift border-primary/10 h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="aspect-square bg-primary/5 relative overflow-hidden">
          <img 
            src={getPlaceholderImage(imageIndex)} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-primary font-medium text-sm mb-3">{role}</p>
          <p className="text-muted-foreground text-sm mb-4">{bio}</p>
          
          {email && (
            <div className="mt-auto">
              <Button 
                variant="outline" 
                className="w-full mt-2 border-primary/20 hover:bg-primary/5"
                onClick={() => window.location.href = `mailto:${email}`}
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
