import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
  onReset: () => void;
}

export const FormActions = ({ isSubmitting, onReset }: FormActionsProps) => {
  return (
    <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      <Button 
        type="submit" 
        className="w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Creating..." : "Create Staff Member"}
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full sm:w-auto"
        onClick={onReset}
        disabled={isSubmitting}
      >
        Reset Form
      </Button>
    </CardFooter>
  );
}; 