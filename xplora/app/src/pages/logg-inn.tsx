import { Metadata } from "next"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { LoginForm } from "@/components/LoginForm"

export const metadata: Metadata = {
  title: "Innlogging",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Logg inn
              </h1>
              <p className="text-sm text-muted-foreground">
                Fyll inn feltene nedenfor
              </p>
            </div>
            <LoginForm />
            <p className="text-sm text-muted-foreground text-center">Har du ikke bruker? Registrer her:</p>
            <Link href="/registrer-bruker" className="text-center">
              <Button>
                Registrer
              </Button>
            </Link>
            
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ved å logge inn godtar de{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                våre brukervilkår
              </Link>{" "}
              og{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                personvernerklæring
              </Link>
              .
            </p>
          </div>
        </div>
    </>
  )
}