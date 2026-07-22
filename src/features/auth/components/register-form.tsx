"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FadeIn } from "@/components/shared/fade-in";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useAppDispatch } from "@/lib/hooks/redux";
import { setCredentials } from "@/lib/store/slices/auth-slice";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(
        setCredentials({
          user: {
            id: "user-new",
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            role: "customer",
            createdAt: new Date().toISOString(),
          },
          token: "demo-token",
        })
      );
      toast.success("Account created successfully!");
      router.push("/account");
    } catch {
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-12">
      <FadeIn className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Create Account</CardTitle>
            <CardDescription>Join LuxeHaven for exclusive benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" {...register("firstName")} aria-invalid={!!errors.firstName} />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" {...register("lastName")} aria-invalid={!!errors.lastName} />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" {...register("email")} />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="new-password" {...register("password")} />
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-destructive">{errors.confirmPassword.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </Container>
  );
}
