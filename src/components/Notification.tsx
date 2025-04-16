
import { toast } from "@/components/ui/sonner";
import { CheckCircle, AlertCircle, InfoIcon } from "lucide-react";

type NotificationType = "success" | "error" | "info";

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
}

export const showNotification = ({ type, title, message }: NotificationProps) => {
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-destructive" />,
    info: <InfoIcon className="h-5 w-5 text-primary" />
  };

  toast(title, {
    description: message,
    icon: icons[type],
    position: "top-center",
    className: `${
      type === "success" 
        ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800" 
        : type === "error" 
        ? "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800" 
        : "bg-sky-50 border-sky-200 dark:bg-sky-950/30 dark:border-sky-800"
    } shadow-lg animate-in slide-in-from-top-5 duration-300`,
    duration: 4000,
  });
};
