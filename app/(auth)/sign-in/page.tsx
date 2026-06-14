/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, ShieldCheck, User } from "lucide-react";

export default function SignIn() {
  const { signIn, fetchStatus } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const finalize = async () => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) {
          console.log(session?.currentTask);
          return;
        }
        const url = decorateUrl("/dashboard");
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const { error } = await signIn.password({ emailAddress, password });

      if (error) {
        setError(error.message);
        return;
      }

      if (signIn.status === "complete") {
        await finalize();
      } else if (signIn.status === "needs_client_trust") {
        const emailCodeFactor = signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === "email_code",
        );
        if (emailCodeFactor) {
          await signIn.mfa.sendEmailCode();
        }
      } else {
        setError("Sign-in failed. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message ?? "Sign-in failed");
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await signIn.mfa.verifyEmailCode({ code });

      if (signIn.status === "complete") {
        await finalize();
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message ?? "Verification failed");
    }
  }

  if (signIn?.status === "needs_client_trust") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2D1B36] via-[#4A2D40] to-[#8E5A5A] p-4 sm:p-8">
        <Card className="w-full max-w-md bg-[#FCFAEF] border border-stone-200 shadow-2xl rounded-2xl">
          <CardHeader className="pt-8 pb-2 flex flex-col items-center text-center">
            <div className="mb-2 text-stone-800">
              <ShieldCheck className="w-12 h-12 stroke-[1.5]" />
            </div>

            <CardTitle className="text-[22px] font-bold text-stone-900 tracking-tight">
              Verify your device
            </CardTitle>
            <p className="text-sm text-stone-500 mt-2 px-4 font-medium leading-relaxed">
              We sent a code to your email. This is a one-time check for
              unrecognized devices.
            </p>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-8 pt-4">
            <form
              onSubmit={onPressVerify}
              className="space-y-4 animate-in fade-in duration-300"
            >
              <div className="space-y-1.5">
                <Label htmlFor="code" className="sr-only">
                  Verification Code
                </Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="000000"
                  className="bg-white border-stone-300 focus-visible:ring-[#3B66FF] text-stone-900 h-12 text-center text-xl tracking-[0.5em] font-mono rounded-xl shadow-sm"
                  maxLength={6}
                  required
                />
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="bg-red-50 border-red-100 mt-2 rounded-xl text-red-600 p-3"
                >
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  className="w-full h-11 bg-[#3B66FF] hover:bg-[#2A4ED1] text-white font-semibold rounded-xl shadow-sm transition-all duration-200"
                  disabled={fetchStatus === "fetching"}
                >
                  {fetchStatus === "fetching"
                    ? "Verifying..."
                    : "Verify Device"}
                </Button>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10 border-stone-300 text-stone-700 hover:bg-stone-200/50 hover:text-stone-900 rounded-xl"
                    onClick={() => signIn.mfa.sendEmailCode()}
                  >
                    Resend
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full h-10 text-stone-600 hover:bg-stone-200/50 hover:text-stone-900 rounded-xl"
                    onClick={() => signIn.reset()}
                  >
                    Start over
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2D1B36] via-[#4A2D40] to-[#8E5A5A] p-4 sm:p-8">
      <Card className="w-full max-w-md bg-[#FCFAEF] border border-stone-200 shadow-2xl rounded-2xl">
        <CardHeader className="pt-8 pb-2 flex flex-col items-center text-center">
          <div className="mb-2 text-stone-800">
            <User className="w-12 h-12 stroke-[1.5]" />
          </div>

          <CardTitle className="text-[22px] font-bold text-stone-900 tracking-tight">
            Sign In to Todo Master
          </CardTitle>
          <p className="text-sm text-stone-500 mt-1 font-medium">
            Welcome back! Please enter your details
          </p>

          <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-stone-600 bg-stone-200/50 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Connection</span>
          </div>
        </CardHeader>

        <CardContent className="px-6 sm:px-8 pb-4 pt-4">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-stone-800"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="name@example.com"
                className="bg-white border-stone-300 focus-visible:ring-[#3B66FF] focus-visible:border-[#3B66FF] text-stone-900 h-11 rounded-xl shadow-sm placeholder:text-stone-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-stone-800"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#3B66FF] hover:text-[#2A4ED1] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-white border-stone-300 focus-visible:ring-[#3B66FF] focus-visible:border-[#3B66FF] text-stone-900 h-11 pr-10 rounded-xl shadow-sm placeholder:text-stone-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-100 mt-2 rounded-xl text-red-600 p-3"
              >
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-11 mt-2 bg-[#3B66FF] hover:bg-[#2A4ED1] text-white font-semibold rounded-xl shadow-sm transition-all duration-200"
              disabled={fetchStatus === "fetching"}
            >
              {fetchStatus === "fetching" ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center pt-2 pb-8">
          <p className="text-sm text-stone-600 font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-[#3B66FF] hover:text-[#2A4ED1] transition-colors"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
