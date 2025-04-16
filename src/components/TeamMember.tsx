
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageIndex: number;
}

const TeamMember = ({ name, role, bio, imageIndex }: TeamMemberProps) => {
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
    <Card className="overflow-hidden hover-lift border-primary/10">
      <CardContent className="p-0">
        <div className="aspect-square bg-primary/5 relative overflow-hidden">
          <img 
            src={getPlaceholderImage(imageIndex)} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-primary font-medium text-sm mb-3">{role}</p>
          <p className="text-muted-foreground text-sm">{bio}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
