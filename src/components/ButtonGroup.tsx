
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  spacing?: "tight" | "normal" | "wide";
}

const ButtonGroup = ({ 
  children, 
  className,
  align = "center",
  spacing = "normal" 
}: ButtonGroupProps) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };
  
  const spacingClasses = {
    tight: "gap-2",
    normal: "gap-4",
    wide: "gap-6",
  };

  return (
    <div className={cn(
      "flex flex-wrap items-center w-full mt-6",
      alignmentClasses[align],
      spacingClasses[spacing],
      className
    )}>
      {children}
    </div>
  );
};

export default ButtonGroup;
