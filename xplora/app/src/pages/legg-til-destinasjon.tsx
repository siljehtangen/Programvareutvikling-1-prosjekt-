import { AddDestinationForm } from "@/components/AddDestinationForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Legg-til-destinasjon",
    description: "Authentication forms built using the components.",
  }

export default function AddDestinationPage() {
    return (
      <>
          <div className="lg:p-8 border-r-2 border-l-2">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold text-center">
                    Legg til ny destinasjon
                </h1>
                <p className="text-sm text-muted-foreground text-center">
                    Alle feltene må fylles ut
                </p>
                <AddDestinationForm />
              </div>
            </div>
          </div>
      </>
    )
  }