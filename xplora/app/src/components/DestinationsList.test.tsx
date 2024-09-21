import React from 'react';
import { render, screen } from '@testing-library/react';
import DestinationsList from './DestinationsList';
import '@testing-library/jest-dom';
import { Destination } from '@/lib/types';
import { useRouter } from 'next/navigation';
import mockRouter from "next-router-mock";
import { AppRouterContextProviderMock } from './AppRouterContextProviderMock';
import { TooltipProvider } from '@radix-ui/react-tooltip';

jest.mock('next/navigation', () => require('next-router-mock'));

describe('DestinationsList test', () => {
  it('Checks if the destination is shown on the site', () => {

    const push = jest.fn();
    const mockDestinations: Destination[] = [
      { _id: 'test@gmail.com', title: 'Stockholm', country: "Sverige", description: 'test', imgSrc:"https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg", activities: "test ", priceClass:"4", continent:"Europa", language:"Svensk", temperature:7, population: 0, ratings:[]},
      { _id: 'testeren@outlook.com', title: 'Berlin', country: "Tyskland", description: 'test', imgSrc:"https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg", activities: "test ", priceClass:"3", continent:"Europa", language:"Tysk", temperature:10, population: 0, ratings:[]},
    ];

    render(<TooltipProvider><DestinationsList destinations={mockDestinations}/></TooltipProvider>);

    for (const destination of mockDestinations) {
      expect(screen.getByText(destination.title)).toBeInTheDocument();
    }
  });
});
