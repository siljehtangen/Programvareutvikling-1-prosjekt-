import * as React from 'react';
import Rating from '@mui/material/Rating';
import { Input } from "@/components/ui/input"
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useUserData } from './providers/UserDataProvider';
import { Destination } from '@/lib/types';

export default function RatingForm({destination, handleSuccess} : {destination: Destination, handleSuccess?: () => void}) {
    

    const userId = useUserData().userData?._id;
    const prevRating = destination.ratings?.find((rating)=> rating.userId === userId)

    const [rating, setRating] = React.useState<number | null>(prevRating?.rating ?? null);
    const [title, setTitle] = React.useState(prevRating?.title ?? "");
    const [description, setDescription] = React.useState(prevRating?.description ?? "");

    function handleSubmit(event: React.SyntheticEvent) {
      event.preventDefault();
      if (rating && userId) {
        fetch('/api/add-rating', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destinationId: destination._id,
            userId,
            rating,
            title,
            description,
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Rating submitted:', data);
          // Handle success (e.g., show a message or clear the form)
          handleSuccess && handleSuccess()
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error (e.g., show an error message)
        });
      }
      else {
        alert("Velg vurdering før du trykker send inn");
      }
    }

    return (userId && <Card className='p-3 mt-4'>
      <form onSubmit={handleSubmit} className='grid gap-3'>
        <div className="flex justify-center items-center">
          <h1>Gi din rating: </h1>
          <Rating
              className='flex bg-[#ffffff10] items-center mx-2 py-1 px-2 rounded-full'
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                  setRating(newValue);
              }}
          />
        </div>
        <div>
          <Label className="sr-only">
            Lag en tittel:
          </Label>
          <Input
            id="descriptionInput"
            placeholder="Tittel"
            autoCapitalize="none"
            autoCorrect="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label className="sr-only">
            Beskrivelse
          </Label>
          <Textarea
            className="min-h-28"
            id="descriptionInput"
            placeholder="Beskrivelse"
            autoCapitalize="none"
            autoCorrect="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {prevRating ? <Button className='p-3'>Endre din rating</Button> : <Button className='p-3'>Send inn</Button>}
      </form>
    </Card>
    );
}