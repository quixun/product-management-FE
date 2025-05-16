import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "./fetch-with-auth";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/types/auth-type";
import { RestoreStaffFormData } from "@/app/(auth)/admin/staff/restore-staff/[staffId]/schema/restore-deleted-staff-schema";

export const useAllStaff = () => {
  return useQuery({
    queryKey: ["all-staff"],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/all-staff`
      );
      return response.json();
    },
  });
};

export const useAllDeletedStaff = () => {
  return useQuery({
    queryKey: ["all-deleted-staff"],
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/all-deleted-staff`
      );
      return response.json();
    },
  });
};

export const useUpdateStaffById = (staffId: string) => {
  return useMutation({
    mutationFn: async (updatedStaff: User) => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/update-staff/${staffId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(updatedStaff),
        }
      );
      
      return response.json();
    },
  });
};

export const useDeleteStaffById = () => {
  return useMutation({
    mutationFn: async (staffId: string) => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/delete-staff/${staffId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      if (response.status === 204) {
        return;
      }

    },
  });
};

export const useRestoreDeletedStaffById = (staffId: string) => {
  return useMutation({
    mutationFn: async (newStaffInfo: RestoreStaffFormData) => {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/restore-deleted-staff/${staffId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(newStaffInfo),
        }
      );
      
      return response.json();
    },
  });
};
