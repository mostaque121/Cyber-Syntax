import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "../components/login/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function LogInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Welcome Back!</CardTitle>
            <CardDescription className="text-center">
              Sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <p className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
