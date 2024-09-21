import { Comment, Destination } from "@/lib/types";
import Rating from "@mui/material/Rating";
import { useUserData } from "./providers/UserDataProvider";
import Link from "next/link";
import {ArrowTopRightIcon} from "@radix-ui/react-icons"
export default function MyReviews({ destinations }: { destinations?: Destination[] }) {
  const dummyComments: Comment[] = [
    {
      date: "27-02-2024",
      value: 2,
    },
    {
      date: "29-02-2024",
      title: "nydelig tur",
      text: "jeg hadde en fantastisk tur til oslo",
      value: 5,
    },
  ];

  const userData = useUserData()

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mt-4">Mine vurderinger</h2>
        {destinations?.map((destination)=> <>
          {destination.ratings?.find((rating) => rating.userId === userData.userAuth?.uid) && <>
            <Link href={`/destinasjoner/${destination._id}`}><h3 className="text-xl hover:underline font-semibold mt-4 inline-block">{destination.title} <ArrowTopRightIcon className="inline-block w-5 h-5"/></h3></Link>
            {destination.ratings?.map((rating, index) => {
            
              if (rating.userId !== userData.userAuth?.uid) return null

              return <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  margin: "10px 0",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p>
                  <strong>{rating.title}</strong>
                </p>
                <p>{rating.description}</p>
                <p>
                  <i>{new Date(rating.date).toISOString()}</i>
                </p>
                <Rating className='flex bg-[#ffffff10] items-center mx-2 py-1 px-2 rounded-full' name="read-only" value={rating.rating} readOnly />
              </div>
            })}
          </>}
        </>)}
      </div>
    </>
  );
}
