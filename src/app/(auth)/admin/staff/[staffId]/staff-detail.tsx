"use client";

import {
  useAllStaff,
  useDeleteStaffById,
  useUpdateStaffById,
} from "@/lib/auth/fetch-all-staff";
import { User } from "@/types/auth-type";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { getUserFromToken } from "@/lib/auth/get-user-from-token";
import { useAuth } from "@/provider/auth-provider";

type StaffDetailPageProps = {
  staffId: string;
};

export default function StaffDetailPage({ staffId }: StaffDetailPageProps) {
  const { data: staff, isLoading, error } = useAllStaff();
  const router = useRouter();
  const { mutate: updateStaffById } = useUpdateStaffById(staffId);
  const queryClient = useQueryClient();
  const { setUser } = useAuth();
  const { mutate: deleteStaffById } = useDeleteStaffById();

  const staffMember = staff?.find((staff: User) => staff.id === staffId);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    userName: staffMember?.userName ?? "",
    email: staffMember?.email ?? "",
    phoneNumber: staffMember?.phoneNumber ?? "",
    avatar: staffMember?.avatar ?? "",
  });

  const handleEditToggle = () => {
    setIsEdit(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      updateStaffById(formData as User, {
        onSuccess: async () => {
          setIsEdit(false);
          toast.success("Staff is updated successfully");
          queryClient.invalidateQueries({ queryKey: ["all-staff"] });
          const updatedUser = await getUserFromToken();
          setUser(updatedUser);
        },
        onError: (e) => {
          toast.error(`Failed to update staff ${e}`);
        },
      });

      toast.success("Staff info updated");
      setIsEdit(false);
    } catch (err) {
      toast.error(`Error updating staff: ${err}`);
    }
  };

  const handleDelete = () => {
    try {
      deleteStaffById(staffId, {
        onSuccess: async () => {
          setIsEdit(false);
          toast.success("Staff was deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["all-staff"] });
          const updatedUser = await getUserFromToken();
          setUser(updatedUser);
        },
        onError: (e) => {
          toast.error(`Failed to delete staff ${e}`);
        },
      });

      toast.success("Staff info were updated");
      setIsEdit(false);
      router.push("/admin");
    } catch (err) {
      toast.error(`Error updating staff: ${err}`);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Skeleton className="w-full h-40 rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-destructive">
        Error: {error.message}
      </div>
    );
  }

  if (!staffMember) {
    return <div className="max-w-2xl mx-auto p-6">Staff member not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.avatar || undefined} />
              <AvatarFallback>
                {formData.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {isEdit ? (
                  <Input
                    name="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                ) : (
                  staffMember.userName
                )}
              </h2>
              {isEdit ? (
                <Input
                  className="mt-1"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="text-muted-foreground">{staffMember.email}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-2 sm:mt-0">
            {!isEdit ? (
              <>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleEditToggle}
                >
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="cursor-pointer">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the staff member.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="cursor-pointer"
                      >
                        Confirm Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant="outline"
                  className="cursor-pointer bg-green-500 text-white hover:text-white hover:bg-green-400"
                  onClick={() => router.push("/admin")}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button className="cursor-pointer" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="secondary"
                  onClick={() => {
                    setIsEdit(false);
                    setFormData({
                      userName: staffMember.userName,
                      email: staffMember.email,
                      phoneNumber: staffMember.phoneNumber,
                      avatar: staffMember.avatar ?? "",
                    });
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
              {isEdit ? (
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{staffMember.phoneNumber}</p>
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Role</p>
              <Badge
                variant={staffMember.role === "admin" ? "default" : "secondary"}
              >
                {staffMember.role}
              </Badge>
            </div>
          </div>

          {isEdit && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="avatar-url" className="text-sm">
                  Avatar URL
                </Label>
                <Input
                  id="avatar-url"
                  name="avatar"
                  placeholder="https://example.com/avatar.png"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div className="text-sm text-muted-foreground text-center">
                — or upload a new image —
              </div>

              {/* File upload */}
              <div className="space-y-2">
                <Label htmlFor="avatar-upload" className="text-sm">
                  Upload Image
                </Label>

                <div className="flex items-center gap-4">
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData((prev) => ({
                            ...prev,
                            avatar: reader.result as string,
                          }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer px-4 py-2 rounded-md border border-input hover:bg-muted transition text-sm"
                  >
                    Choose File
                  </label>
                </div>

                <p className="text-xs text-muted-foreground">
                  Uploading a new image will override the avatar URL above.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
