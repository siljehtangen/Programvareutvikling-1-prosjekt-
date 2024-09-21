import { Metadata } from "next"
import Link from "next/link"
import UserAuthForm from "@/components/SignUpForm"
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {

  return (
    <>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Lag en bruker
              </h1>
              <p className="text-sm text-muted-foreground">
                Fyll inn feltene nedenfor
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ved å lage bruker godtar du våre betingelser.{" "}
        
            </p>
          </div>
        </div>
    </>
  )
}