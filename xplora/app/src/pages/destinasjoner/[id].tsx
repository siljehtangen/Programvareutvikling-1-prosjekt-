import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Image from "next/image";
import CommentSection from "@/components/Comments";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  SewingPinFilledIcon,
  PersonIcon,
  Pencil2Icon,
  TrashIcon,
  SunIcon,
  ChatBubbleIcon,
  SketchLogoIcon,
} from "@radix-ui/react-icons"
import { Destination } from '@/lib/types';
import AvgRating from '@/components/AvgRating';
import RatingForm from '@/components/RatingForm';

import { useUserData } from '@/components/providers/UserDataProvider';
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req } = context;
  const host = req.headers.host;
  const id = params?.id;


  try {
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
    return { notFound: true };
  }
};

export default function DestinationDetails({ destination }: {destination: Destination}){

  const {title, continent, country, priceClass, language, population, temperature, imgSrc, description, activities} = destination 

  const role = useUserData().userData?.role;
  const router = useRouter()
  const pathName = usePathname()

  function refresh() {
    router.replace(pathName);
  }

  async function deleteDestination() {
    try {
      const response = await fetch('/api/destination', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              id: destination._id
          }),
      });
      if (!response.ok) throw new Error('Failed to find destination');
  
      const data = await response.json();
  
      console.log(data);

      router.push("/");
  
    } catch (error) {
        console.error('Failed to delete destination', error);
    }
  }

  function handleDelete(event: React.SyntheticEvent) {
    event.preventDefault();
  
    if (role == 'admin') {
      deleteDestination();
    }
    else {
      alert('Det er kun adminbrukere som kan slette destinasjoner!');
    }
  }

  return (
    <>
      <div>
        <AspectRatio ratio={12/6} className="mb-2">
          <Image src={imgSrc} alt ="" fill/>
        </AspectRatio>
        <h1 className="text-4xl font-semibold">{title}</h1>
      </div>
      <div className="flex w-[900px]">
        <div className="flex border w-[200px] rounded-lg">
          <SewingPinFilledIcon className="h-7 w-7 fill-current" />
          <h2 className="text-2xl text-muted-foreground">{country}, {continent}</h2>
        </div>
        <div className="flex w-[350px] mt-1 ml-10">
          <AvgRating ratings={destination.ratings} />
        </div>
      </div>
      
      <div className="grid gap-x-4 gap-y-2 xl:grid-cols-4 md:grid-cols-2 mt-4">
        <div className="flex text-black border-2 border-red-500 w-100 rounded-full justify-center bg-red-200 px-5"> 
          <SketchLogoIcon className="h-5 w-5 fill-current mr-1"></SketchLogoIcon>
          <h2>Prisklasse: {priceClass}</h2>
        </div>
        <div className="flex text-black border-2 border-sky-500 w-100 rounded-full justify-center bg-sky-200 px-5">
          <ChatBubbleIcon className="h-5 w-5 fill-current mr-1"></ChatBubbleIcon>
          <h2>Språk: {language}</h2>
        </div>
        <div className="flex text-black border-2 border-yellow-500 w-100 rounded-full justify-center bg-yellow-200 px-5">
          <PersonIcon className="h-5 w-5 fill-current mr-1"></PersonIcon>
          <h2>Befolkningstall: {population}</h2>
        </div>
        <div className="flex text-black border-2 border-cyan-500 w-100 rounded-full justify-center bg-cyan-200 px-3">
          <SunIcon className="h-4 w-4 fill-current mr-1 mt-1"></SunIcon>
          <h2>Temperatur: {temperature}°C</h2>
        </div>
      </div>
      <div className='mt-4'>
        <p>
          {description}
        </p>
      </div>
      <div>
        <h2 className='text-2xl font-semibold mt-4'>
          Aktiviteter
        </h2>
        <p>
          {activities}
        </p>
      </div>
      <div>
      <RatingForm handleSuccess={refresh} destination={destination} />
      <CommentSection ratings={destination.ratings} />
      </div>
      <div className='flex flex-col justify-center align-middle gap-3'>
        {role === 'admin' && <>
          <Link href={`/endre-destinasjon?id=${destination._id}`} className={cn(buttonVariants({variant: "secondary"}))}>Endre destinasjon <Pencil2Icon className='ml-2 w-5 h-5'/></Link>
          <Button variant={"destructive"} onClick={handleDelete}>SLETT DESTINASJON <TrashIcon className='ml-2 w-5 h-5'/></Button>
        </>}
      </div>
    </>
  )
}