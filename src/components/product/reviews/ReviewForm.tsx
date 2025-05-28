import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { addReview } from '@/api/review';
import type { Review } from '@/types/Review';
import { toast } from 'sonner';

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!comment || rating === 0) {
      toast.error('Please fill in all fields and provide a rating.');
      setLoading(false);
      return;
    }

    try {
      const newReview: Review = {
        _id: '', 
        name: '', 
        user: '',
        product: productId,
        rating,
        comment,
        createdAt: '', 
        updatedAt: '' 
      };

      await addReview(productId, newReview);
      setSuccess('Review submitted successfully!');
      setComment('');
      setRating(0);
      onReviewSubmit();
    } catch (err: any) {
      if(err.response?.status === 400){
        toast.error('You can only review products you have purchased.');
      } else {
        setError('Failed to submit review. Please try again.');
      }
      console.error('Review submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="rating">Rating</Label>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-6 w-6 cursor-pointer ${
                    index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;