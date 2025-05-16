import { Control, Controller, FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddStaffFormValues } from "../schema/add-staff-schema";

interface FormInputFieldProps {
  name: keyof AddStaffFormValues;
  label: string;
  placeholder: string;
  control: Control<AddStaffFormValues>;
  error?: FieldError;
  type?: string;
  className?: string;
}

export const FormInputField = ({
  name,
  label,
  placeholder,
  control,
  error,
  type = "text",
  className = "",
}: FormInputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...field}
            className={`${error ? "border-red-500" : ""} ${className}`}
          />
        )}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}; 