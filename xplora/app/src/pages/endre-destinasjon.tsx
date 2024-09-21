import { AddDestinationForm } from "@/components/AddDestinationForm"
import { Destination } from "@/lib/types";
import { GetServerSideProps, Metadata } from "next"

export const metadata: Metadata = {
    title: "Legg-til-destinasjon",
    description: "Authentication forms built using the components.",
  }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const host = req.headers.host;

  try {

    const id = req.url?.split("?id=")[1]; 

    const response = await fetch(`http://${host}/api/destination?id=${id}`)

    if (!response.ok) {
      return { notFound: true };
    }

    const destination = await response.json();

    console.log(destination)

    return {
      props: { destination },
    };
  } catch (error) {
    console.log("noooo")
    return { notFound: true };
  }
};

export default function AddDestinationPage({destination} : {destination: Destination}) {
    return (
      <>
          <div className="lg:p-8 border-r-2 border-l-2">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold text-center">
                    Endre destinasjon: {destination.title}
                </h1>
                <p className="text-sm text-muted-foreground text-center">
                    Alle feltene må fylles ut
                </p>
                <AddDestinationForm adminOnly destination={destination} />
              </div>
            </div>
          </div>
      </>
    )
  }