import { Inter } from "next/font/google";
import DestinationsList from "@/components/DestinationsList";
import { useEffect, useState } from "react";
import { Destination } from "@/lib/types";
import { useUserData } from "@/components/providers/UserDataProvider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

    const favoriteDestinations = useUserData().userData?.favoriteDestinations;
    const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/destinations");
                if (!response.ok) {
                    throw new Error('Failed to fetch destinations');
                }
                const data: Destination[] = await response.json();
                
                const tempFilteredDestinations: Destination[] = []
                data.forEach(async (destination) => {
                    const isFavorite = favoriteDestinations?.includes(destination._id);
                    if (isFavorite) {
                        tempFilteredDestinations.push(destination)
                    }
                });
                setFilteredDestinations(tempFilteredDestinations)

                console.log("Fetched destinations:", data);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        }
        if (favoriteDestinations) {
            fetchData()
        }
    }, [favoriteDestinations])

    return (
        <main>
            <h2 className="text-xl text-center font-semibold pb-3">Mine favoritter</h2>
            <DestinationsList destinations={filteredDestinations} />
        </main>
    );
}