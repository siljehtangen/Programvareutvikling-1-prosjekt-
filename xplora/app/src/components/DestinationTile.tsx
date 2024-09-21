import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import {
    FaceIcon,
    RocketIcon,
    StarIcon,
    StarFilledIcon,
    DrawingPinIcon,
    DrawingPinFilledIcon
  } from "@radix-ui/react-icons"
import { Button } from "./ui/button";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./providers/AuthProvider";
import { Destination } from "@/lib/types";
import { UserData, useUserData } from "./providers/UserDataProvider";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "./ui/tooltip";

export default function DestinationTile({ title, imgSrc, _id }: Destination) {
   
    const auth = useAuth()
    const {userData, setUserData} = useUserData()
    const router = useRouter()

    const [isPinned, setIsPinned] = useState<boolean>(false);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    // Initialize isPinned and isFavorite based on userData
    useEffect(() => {
        setIsPinned(userData?.pinnedDestinations?.includes(_id) ?? false);
        setIsFavorite(userData?.favoriteDestinations?.includes(_id) ?? false);
    }, [userData, _id]);

    // Update user preferences
    const updateUser = useCallback(async (actionType: 'pin' | 'favorite') => {
        if (!userData?._id || !_id) {
            router.push("/logg-inn")
            return;
        }

        let updatedPinned = [...(userData.pinnedDestinations ?? [])];
        let updatedFavorites = [...(userData.favoriteDestinations ?? [])];

        if (actionType === 'pin') {
            if (isPinned) {
                updatedPinned = updatedPinned.filter(id => id !== _id); // Unpin
            } else {
                updatedPinned.push(_id); // Pin
            }
        }

        if (actionType === 'favorite') {
            if (isFavorite) {
                updatedFavorites = updatedFavorites.filter(id => id !== _id); // Unfavorite
            } else {
                updatedFavorites.push(_id); // Favorite
            }
        }

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: userData._id,
                    pinnedDestinations: updatedPinned,
                    favoriteDestinations: updatedFavorites,
                }),
            });
            if (!response.ok) throw new Error('Failed to update user');

            const data = await response.json();

            console.log(data)

            setUserData(data.user); // Adjust based on actual API response structure
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    }, [userData, _id, isPinned, isFavorite, setUserData]);

    // Handlers for button clicks
    const handlePinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsPinned(!isPinned);
        updateUser("pin"); // Call updateUser after state is set
    };

    const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
        updateUser("favorite"); // Call updateUser after state is set
    };

    return (
        <Link href={auth.user ? "/destinasjoner/"+_id : "/logg-inn"}>
            <Card >
                <CardContent className="pt-6">
                    <div className="flex justify-between pb-2">
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <div className="flex">
                        <Tooltip>
                            <TooltipTrigger>
                            <Button onClick={handleFavoriteClick} size={"icon"} variant={"ghost"}>
                              {isFavorite ? <StarFilledIcon className="h-5 w-5 fill-current" /> : <StarIcon className="h-5 w-5 fill-current" />}
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {isFavorite ? <p>Fjern fra Mine Favoritter</p> : <p>Legg til i Mine Favoritter</p>}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                            <Button onClick={handlePinClick} size={"icon"} variant={"ghost"}>
                              {isPinned ? <DrawingPinFilledIcon className="h-5 w-5 fill-current" /> : <DrawingPinIcon className="h-5 w-5 fill-current" />}
                            </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                {isPinned ? <p>Fjern fra Mine Besøkte Steder</p> : <p>Legg til i Mine Besøkte Steder</p>}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <AspectRatio ratio={16/9} className="mb-2">
                    <Image src={imgSrc} alt="" fill objectFit="cover"/>
                </AspectRatio>
            </CardContent>
        </Card>
    </Link>
  );
}
