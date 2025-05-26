import React from 'react';
import type { Review } from '@/types/Review';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <Card className="mb-2 p-4 border rounded-lg shadow-sm">
      <CardHeader className="p-0 pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">{review.name}</CardTitle>
        <div className="flex items-center text-sm text-gray-500">
          {renderStars(review.rating)}
          <span className="ml-2 text-xs">{new Date(review.createdAt).toLocaleDateString()}</span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-sm text-gray-700">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;