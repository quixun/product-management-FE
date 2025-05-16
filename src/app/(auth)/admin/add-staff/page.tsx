"use client";

import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { 
  BackButton, 
  StaffFormHeader, 
  StaffForm 
} from "./components";

export default function AddStaffPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  if (user && user.role !== "admin") {
    router.push("/");
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <BackButton />
      <div className="max-w-2xl h-full mx-auto">
        <Card className="shadow-lg border-neutral-200 dark:border-neutral-800">
          <StaffFormHeader />
          <StaffForm />
        </Card>
      </div>
    </div>
  );
}
