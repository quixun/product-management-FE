import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  
  return (
    <Button
      variant="ghost"
      className="mb-6 flex items-center"
      onClick={() => router.push("/admin")}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Dashboard
    </Button>
  );
}; 