import { UserPlus } from "lucide-react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const StaffFormHeader = () => {
  return (
    <CardHeader className="pb-4 space-y-1">
      <div className="flex items-center space-x-2">
        <UserPlus className="h-6 w-6 text-primary" />
        <CardTitle className="text-2xl font-bold">Add New Staff</CardTitle>
      </div>
      <CardDescription>
        Create a new staff account with the form below
      </CardDescription>
      <Separator />
    </CardHeader>
  );
}; 