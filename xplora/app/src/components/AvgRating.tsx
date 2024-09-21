import * as React from 'react';
import Rating from '@mui/material/Rating';
import { Rating as RatingType } from '@/lib/types';


export default function AvgRating({ratings}: {ratings?: RatingType[]}) {

    const values: number[] = ratings?.map((rating)=>rating.rating) ?? []

    const count = values?.length ?? 0
    const avgValue = count > 0 ? values?.reduce((a, b) => a + b) / values.length : 0

    return (
        <div className="flex justify-center items-center">
            <Rating className='bg-[#ffffff10] mx-2 py-1 px-2 rounded-full' name="half-rating-read" value={avgValue} precision={0.1} readOnly data-testid="avg-rating"  data-avgvalue={avgValue}/>
            <div className="flex ml-2 mt-0.5">
                <p className='text-sm'>Antall ratings: {count}</p>
            </div>
        </div>
        
    );
}
