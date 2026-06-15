/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
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
import { ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUp() {
  const { signUp, fetchStatus } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const { error } = await signUp.password({
        emailAddress,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      await signUp.verifications.sendEmailCode();
      setPendingVerification(true);
    } catch (err: any) {
      console.error(err);
      setError("Signup failed");
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await signUp.verifications.verifyEmailCode({
        code,
      });

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ decorateUrl }) => {
            const url = decorateUrl("/dashboard");
            router.push(url);
          },
        });
      } else {
        console.error("Signup not complete:", signUp);
      }
    } catch (err: any) {
      console.error(err);
      setError("Verification failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-[#2D1B36] via-[#4A2D40] to-[#8E5A5A] p-4 sm:p-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="w-full bg-[#FCFAEF] border border-stone-200 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="pt-8 pb-2 flex flex-col items-center text-center">
            <div className="mb-2 text-stone-800">
              <User className="w-12 h-12 stroke-[1.5]" />
            </div>

            <CardTitle className="text-[22px] font-bold text-stone-900 tracking-tight">
              Sign Up for Todo Master
            </CardTitle>
            <p className="text-sm text-stone-500 mt-1 font-medium">
              Create your account to get started
            </p>

            <div className="flex items-center gap-1.5 mt-3 text-xs font-medium text-[#2D8A78] bg-[#2D8A78]/10 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure Verification</span>
            </div>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-4 pt-4 overflow-hidden">
            <div id="clerk-captcha" className="mb-2" />

            <AnimatePresence mode="wait" initial={false}>
              {!pendingVerification ? (
                <motion.form
                  key="credentials-form"
                  onSubmit={submit}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4"
                >
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
                      className="bg-white border-stone-300 focus-visible:ring-[#2D8A78] focus-visible:ring-2 focus-visible:border-[#2D8A78] text-stone-900 h-11 rounded-xl shadow-sm placeholder:text-stone-400"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="password"
                      className="text-sm font-semibold text-stone-800"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="bg-white border-stone-300 focus-visible:ring-[#2D8A78] focus-visible:ring-2 focus-visible:border-[#2D8A78] text-stone-900 h-11 rounded-xl shadow-sm placeholder:text-stone-400"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -6, rotate: -1 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                      className="mt-2"
                    >
                      <Alert
                        variant="destructive"
                        className="bg-red-50 border-red-100 rounded-xl text-red-600 p-3"
                      >
                        <AlertDescription className="text-sm">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={fetchStatus === "fetching"}
                    className="w-full h-11 mt-2 bg-[#2D8A78] hover:bg-[#236B5D] text-white font-semibold rounded-xl shadow-sm transition-all duration-200"
                  >
                    {fetchStatus === "fetching" ? "Processing..." : "Sign Up"}
                  </Button>
                </motion.form>
              ) : (
                <motion.form
                  key="verification-form"
                  onSubmit={onPressVerify}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-base font-bold text-stone-800">
                      Check your inbox
                    </h3>
                    <p className="text-sm text-stone-500 mt-1">
                      Enter the 6-digit code sent to{" "}
                      <span className="font-semibold text-stone-700">
                        {emailAddress}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="code" className="sr-only">
                      Verification Code
                    </Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="000000"
                      className="bg-white border-stone-300 focus-visible:ring-[#2D8A78] text-stone-900 h-12 text-center text-xl tracking-[0.5em] font-mono rounded-xl shadow-sm"
                      maxLength={6}
                      required
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -6, rotate: -1 }}
                      animate={{ opacity: 1, x: 0, rotate: 0 }}
                    >
                      <Alert
                        variant="destructive"
                        className="bg-red-50 border-red-100 rounded-xl text-red-600 p-3"
                      >
                        <AlertDescription className="text-sm">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={fetchStatus === "fetching"}
                    className="w-full h-11 bg-[#2D8A78] hover:bg-[#236B5D] text-white font-semibold rounded-xl shadow-sm transition-all duration-200"
                  >
                    {fetchStatus === "fetching"
                      ? "Verifying..."
                      : "Verify Email"}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="justify-center pt-2 pb-8">
            <p className="text-sm text-stone-600 font-medium">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-[#2D8A78] hover:text-[#236B5D] transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
