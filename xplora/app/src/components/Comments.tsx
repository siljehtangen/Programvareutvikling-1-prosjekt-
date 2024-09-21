import { Comment, Rating as RatingType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Rating from '@mui/material/Rating';
import { useTheme } from "next-themes";
export default function CommentSection({ ratings }: { ratings?: RatingType[] }) {

    const dummyComments: Comment[] = [
        {
            date: "27-02-2024",
            title: "dårlig mat",
            text: "sykt dårlig mat!!!!!!",
            value: 2,

        },
        {
            date: "29-02-2024",
            title: "nydelig tur",
            text: "jeg hadde en fantastisk tur til oslo",
            value: 5,

        },

    ];

    const {theme} = useTheme()

    return (
        <>
            <div>
                <h2 className='text-lg font-semibold mt-4'>
                    Vurderinger
                </h2>
                {ratings?.map((rating, index) => (
                    <div key={index} className={cn("p-2 my-2 rounded border border-gray-300", theme === "light" ? "bg-[#f9f9f9]" : "")}>
                        <p><strong>{rating.title}</strong></p>
                        <p>{rating.description}</p>
                        <p><i>{new Date(rating.date).toUTCString()}</i></p>
                        <Rating className='flex bg-[#ffffff10] items-center mt-2 py-1 px-2 rounded-full' name="read-only" value={rating.rating} readOnly />
                    </div>
                ))}
            </div>
        </>
    );
}
