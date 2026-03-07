"use client"

import React, {useState} from 'react'
import { useSignUp } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



function SignUpPage() {
    const {isLoaded, signUp, setActive} = useSignUp(); 
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState("");

    const router = useRouter();

    if(!isLoaded) {
    return null;
    }

    async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!isLoaded) {
            return;
        }

        try {
            await signUp.create({
              emailAddress,
              password,
            });

            await signUp.prepareEmailAddressVerification({
              strategy: "email_code",
            });

            setPendingVerification(true);

        } catch (error: any) {
            console.log(JSON.stringify(error, null, 2));
            setError(error.errors[0].message);
        }
    }

    async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(!isLoaded) {
            return;
        }
    }
    
}   

export default SignUpPage;