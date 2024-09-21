import Image from "next/image";
import { Inter } from "next/font/google";
import DestinationsList from "@/components/DestinationsList";
import { useEffect, useState } from "react";
import { Destination } from "@/lib/types";
import RecommendedDestination from "@/components/RecommendedDestination";
import Filter from "@/components/Filter";
import { useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])

  const searchParams = useSearchParams()
  
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

  useEffect(() => {
    // Assuming filters like priceClass, continent, and temperature
    const priceClass = searchParams.get("priceClass");
    const continent = searchParams.get("continent");
    const temperature = searchParams.get("temperature");
    const searchTerm = searchParams.get("search");

    const isFiltered = priceClass || continent || temperature || searchTerm;

    /*
      <SelectItem value="1">-10°C eller kaldere</SelectItem>
      <SelectItem value="2">-10°C - 0°C</SelectItem>
      <SelectItem value="3">0°C - 10°C</SelectItem>
      <SelectItem value="4">10°C - 20°C</SelectItem>
      <SelectItem value="5">20°C - 30°C</SelectItem>
      <SelectItem value="6">30°C eller varmere</SelectItem>
    */

    if (isFiltered) {
      // Apply filters
      const filtered = destinations.filter(destination => {
        return (!priceClass || destination.priceClass === priceClass) &&
               (!continent || destination.continent === continent) &&
               (!temperature || (
                (temperature === "1" && destination.temperature <= -10) ||
                (temperature === "2" && -10 <= destination.temperature && destination.temperature <= 0) ||
                (temperature === "3" && 0 <= destination.temperature && destination.temperature <= 10) ||
                (temperature === "4" && 10 <= destination.temperature && destination.temperature <= 20) ||
                (temperature === "5" && 20 <= destination.temperature && destination.temperature <= 30) ||
                (temperature === "6" && 30 <= destination.temperature)
              )) &&
              (!searchTerm || destination.title.toLowerCase().includes(searchTerm.toLowerCase()))
      });

      setFilteredDestinations(filtered);
    } else {
      // No filters applied, show all destinations
      setFilteredDestinations(destinations);
    }
  }, [destinations, searchParams]);

  const showRecommended = !searchParams.toString();


  return (
    <main>
      <Filter/>
      {showRecommended && <>
        <RecommendedDestination destinations={destinations}/>
        <h2 className="text-xl text-center font-semibold pb-3">Alle destinasjoner</h2>
      </>}
      <DestinationsList destinations={filteredDestinations} />
    </main>
  );
}
