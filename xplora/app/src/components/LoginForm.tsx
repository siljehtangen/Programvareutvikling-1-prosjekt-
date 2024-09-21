"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseClient, } from "@/lib/firebase"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const auth = getAuth(firebaseClient); // Initialize Firebase Auth

  async function signIn(email: string, password: string) {
    setIsLoading(true); // Indicate loading state
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("signed in", userCredential.user.email);
      // Redirect upon successful login
      router.push('/'); // Adjust the path as needed
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // Show error message
      } else {
        console.error("Error signing in:", error);
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    signIn(email, password);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              E-post
            </Label>
            <Input
              id="emailInput"
              placeholder="E-post"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Passord
            </Label>
            <Input
              id="passwordInput"
              placeholder="Passord"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            Logg inn
          </Button>

        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        
      </div>
      
    </div>
  )
}
