"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  RestoreStaffFormData,
  restoreStaffSchema,
} from "./schema/restore-deleted-staff-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRestoreDeletedStaffById } from "@/lib/auth/fetch-all-staff";
import { toast } from "sonner";
import { getUserFromToken } from "@/lib/auth/get-user-from-token";
import { useAuth } from "@/provider/auth-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type RestoreDeletedStaffPageProps = {
  staffId: string;
};

export default function RestoreDeletedStaffPage({
  staffId,
}: RestoreDeletedStaffPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RestoreStaffFormData>({
    resolver: zodResolver(restoreStaffSchema),
    defaultValues: {
      userName: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
  });

  const { mutate: restoreStaff } = useRestoreDeletedStaffById(staffId);
  const { setUser } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  const onSubmit = async (data: RestoreStaffFormData) => {
    try {
      restoreStaff(
        { ...data },
        {
          onSuccess: async () => {
            toast.success("Staff is updated successfully");
            queryClient.invalidateQueries({ queryKey: ["all-staff"] });
            const updatedUser = await getUserFromToken();
            setUser(updatedUser);
            router.push("/admin");
          },
          onError: (e) => {
            toast.error(`Failed to update staff ${e}`);
          },
        }
      );
    } catch (error) {
      toast.error(`Failed to restore staff ${error}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Restore Deleted Staff</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="userName">Username</Label>
              <Input {...register("userName")} />
              {errors.userName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input {...register("phoneNumber")} />
              {errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="justify-end pt-4">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              Restore Staff
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
