"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserFromToken } from "@/lib/auth/get-user-from-token";
import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type StaffLoginFormValues = {
  userName: string;
  password: string;
};

export default function StaffLoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StaffLoginFormValues>();

  const router = useRouter();

  const { user, setUser } = useAuth();

  const onSubmit = async (data: StaffLoginFormValues) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login-staff`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message);
      }

      const result = await res.json();

      localStorage.setItem("authToken", result.accessToken);
      localStorage.setItem("authRefreshToken", result.refreshToken);

      const user = await getUserFromToken();
      setUser(user);

      toast.success("Login successful");
    } catch (error) {
      toast.error(
        `Login failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  useEffect(() => {
    if (user) {
      router.replace("/staff");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Sign in with Staff Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input id="userName" placeholder="John Doe" {...field} />
                )}
              />
              {errors.userName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
