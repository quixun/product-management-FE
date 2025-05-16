import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CardContent } from "@/components/ui/card";
import { addStaffSchema, AddStaffFormValues } from "../schema/add-staff-schema";
import { FormInputField } from "./FormInputField";
import { PasswordInput } from "./PasswordInput";
import { FormActions } from "./FormActions";
import { fetchWithAuth } from "@/lib/auth/fetch-with-auth";

export const StaffForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddStaffFormValues>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      userName: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: AddStaffFormValues) => {
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/add-staff`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create staff member");
      }

      toast.success("Staff member created successfully");
      reset();
    } catch (error) {
      toast.error(
        `Failed to create staff member: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-6 py-5">
        <div className="space-y-4">
          <FormInputField
            name="userName"
            label="Username"
            placeholder="user name for staff"
            control={control}
            error={errors.userName}
          />

          <PasswordInput 
            control={control} 
            error={errors.password} 
          />

          <FormInputField
            name="email"
            label="Email Address"
            placeholder="email for staff"
            type="email"
            control={control}
            error={errors.email}
          />

          <FormInputField
            name="phoneNumber"
            label="Phone Number"
            placeholder="phone number for staff"
            control={control}
            error={errors.phoneNumber}
          />
        </div>
      </CardContent>

      <FormActions 
        isSubmitting={isSubmitting} 
        onReset={() => reset()} 
      />
    </form>
  );
}; 