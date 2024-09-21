import { Destination } from "@/lib/types";
import { useUserData } from "./providers/UserDataProvider";
import DestinationTile from "./DestinationTile";
import { useEffect, useState } from "react";

// Creds to Chad GPT

export default function RecommendedDestination({destinations} : {destinations: Destination[]}) {

    const userData = useUserData().userData
    const [recommended, setRecommended] = useState<Destination | null>(null)

    function findMostCommon(array: string[]): string {
        return array.sort((a, b) =>
            array.filter(v => v === a).length - array.filter(v => v === b).length
        ).pop() || '';
    }
    
    function calculateScore(destination: Destination, { mostCommonCountry, mostCommonLanguage, mostCommonPriceClass, averageTemperature }: any): number {
        let score = 0;
        if (destination.country.toLowerCase() === mostCommonCountry.toLowerCase()) score += 1;
        if (destination.language.toLowerCase() === mostCommonLanguage.toLowerCase()) score += 1;
        if (destination.priceClass === mostCommonPriceClass) score += 1;
        // Score based on how close the temperature is to the average, the closer the higher the score, with a small impact
        const temperatureDifference = Math.abs(destination.temperature - averageTemperature);
        score += Math.max(0, 1 - (temperatureDifference / 10)); // Arbitrary scoring for temperature
        return score;
    }

    useEffect(()=>{
        if (!userData?.favoriteDestinations?.length) {
            setRecommended(null);
            return;
        }

        const attributes = userData.favoriteDestinations.reduce((acc, favId) => {
            const found = destinations.find(a => favId === a._id);
            if (found) {
                acc.countries.push(found.country);
                acc.languages.push(found.language);
                acc.priceClasses.push(found.priceClass);
                acc.temperatures.push(found.temperature);
            }
            return acc;
        }, { 
            countries: [] as string[], 
            languages: [] as string[], 
            priceClasses: [] as string[], 
            temperatures: [] as number[] 
        });

        // Calculate the most common attributes
        const mostCommonCountry = findMostCommon(attributes.countries);
        const mostCommonLanguage = findMostCommon(attributes.languages);
        const mostCommonPriceClass = findMostCommon(attributes.priceClasses);
        const averageTemperature = attributes.temperatures.length ? attributes.temperatures.reduce((a, b) => a + b, 0) / attributes.temperatures.length : 0;

        // Filter out already favorited destinations
        const nonFavoritedDestinations = destinations.filter(destination => !userData.favoriteDestinations?.includes(destination._id));

        // Score remaining destinations
        const scoredDestinations = nonFavoritedDestinations.map(destination => ({
            ...destination,
            score: calculateScore(destination, { mostCommonCountry, mostCommonLanguage, mostCommonPriceClass, averageTemperature })
        }));

        scoredDestinations.sort((a, b) => b.score - a.score);
        setRecommended(scoredDestinations[0] || null);
    }, [userData, destinations]);

    return <div className="flex-col justify-center align-middle pb-5">
        {recommended && <>
            <h2 className="text-xl text-center font-semibold pb-3">Anbefalt for deg</h2>
            <div><DestinationTile {...recommended}/></div>
        </>}
    </div>
}