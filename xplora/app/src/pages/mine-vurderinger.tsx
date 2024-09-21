import MyReviews from "@/components/MyReviews";
import { Destination } from "@/lib/types";
import { useEffect, useState } from "react";

export default function MyReviewsPage() {

    const [destinations, setDestinations] = useState<Destination[]>([])
  
    useEffect(()=>{
        async function fetchData() {
        try {
            const response = await fetch("/api/destinations");
            if (!response.ok) {
            throw new Error('Failed to fetch destinations');
            }
            const data: Destination[] = await response.json();
            setDestinations(data);
            console.log("Fetched destinations:", data);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
        }

        fetchData()
    }, [])

    return (
        <MyReviews destinations={destinations} />
    )
    

}