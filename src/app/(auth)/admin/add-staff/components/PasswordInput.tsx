import { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { AddStaffFormValues } from "../schema/add-staff-schema";

interface PasswordInputProps {
  control: Control<AddStaffFormValues>;
  error?: FieldError;
}

export const PasswordInput = ({ control, error }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password for staff"
              {...field}
              className={error ? "border-red-500 pr-10" : "pr-10"}
            />
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}; 