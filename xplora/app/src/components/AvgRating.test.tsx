import React from 'react';
import { render } from '@testing-library/react';
import AvgRating from './AvgRating'; 

describe('AvgRating test', () => {
  it('Checks if the average rating is calculated correctly', () => {
    const mockRatings = [
      { userId: 'user1', title: 'Great!', description: 'Awesome product', date: '2023-03-01', rating: 4 },
      { userId: 'user2', title: 'Excellent', description: 'Highly recommended', date: '2023-03-02', rating: 5 },
    ];

    const { getByTestId } = render(<AvgRating ratings={mockRatings} />);

    const expectedAvg = (4 + 5) / 2; 
    console.log('Expected average rating:', expectedAvg);

    const ratingComponent = getByTestId("avg-rating");
    const avgElement = parseFloat(ratingComponent.getAttribute('data-avgvalue') || "0");
    console.log('Actual average rating from component:', avgElement);

    expect(avgElement).toBeCloseTo(expectedAvg, 1);
  });
});
