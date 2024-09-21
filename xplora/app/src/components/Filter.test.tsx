// Import necessary utilities and components
import React from 'react';
import { fireEvent, getByPlaceholderText, getByText, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { AppRouterContextProviderMock } from './AppRouterContextProviderMock';
import Filter from './Filter';

// Det var ikke hensiktsmessig å bruke 1000 år på å prøve å få tak i verdier fra shadcn select
// Vi velger heller manuell testing av filtre

/*
jest.mock('next/navigation', () => require('next-router-mock'));

describe('Filter test', () => {
  it('Checks if the filter and search are set correctly in URL parameters', async () => {

    const push = jest.fn();
    const { getByTestId, getByText, getByPlaceholderText } = render(<AppRouterContextProviderMock router={{ push }}><Filter /></AppRouterContextProviderMock>);

    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    // Simulate user input
    fireEvent.change(getByTestId('search-input'), { target: { value: 'London' } });

    const continentBtn = getByTestId('continent-select')
    fireEvent.click(continentBtn);
    //fireEvent.click(continentBtn);
    screen.debug(getByTestId('continent-select'))
    
    console.log("after")
    screen.debug()
    
    fireEvent.click(getByText('Prisklasse'));
    fireEvent.click(getByText('$'));

    fireEvent.click(getByText('Temperatur'));
    fireEvent.click(getByText('-10°C eller kaldere'));

    // Simulate form submission
    fireEvent.submit(getByTestId('search-form'));

    // Check if the router's push function was called with the correct URL parameters
    expect(push).toHaveBeenCalledWith(expect.objectContaining({
        pathname: '/search', // Assuming '/search' is the path you're navigating to; adjust as necessary
        query: expect.objectContaining({
          search: 'London',
          continent: 'Europa',
          temperature: '1',
        }),
    }));
  });
});
*/