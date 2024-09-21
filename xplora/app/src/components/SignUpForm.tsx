"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/components/providers/AuthProvider';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseClient, } from "@/lib/firebase"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const router = useRouter()

  const auth = getAuth(firebaseClient); // Get the auth instance
  const authContext = useAuth()

  async function signUp(email: string, password: string) {
    setIsLoading(true); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("signed up", user.email, user.uid);
      // Redirect upon successful login
      router.push('/'); // Adjust the path as needed

      console.log(authContext.user)

      // Handle success (e.g., navigate to dashboard)
    } catch (error) {
      if (error instanceof Error) { 
        alert(error.message); 
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setIsLoading(false); // Ensure loading is set to false regardless of outcome
    }
  }

  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    signUp(email, password);
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
              id="email"
              placeholder="E-post"
              type="email" // Changed from username to email for semantic correctness
              value={email} 
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Passord
            </Label>
            <Input
              id="password"
              placeholder="Passord"
              type="password"
              value={password} // Bind input value
              onChange={(e) => setPassword(e.target.value)} // Update state on change
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          
          <Button type="submit" disabled={isLoading}>
            Opprett bruker
          </Button>
        </div>
      </form>
    </div>
  );
}