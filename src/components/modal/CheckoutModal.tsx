import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createOrder } from '@/api/order';
import { createZaloPay } from '@/api/zalopay';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/store/cartSlice';

import type { Items } from '@/types/Order';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Items[];
  coupon: string | null;
}

type ViewState = 'form' | 'zalopay_redirect' | 'cod_thankyou';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, coupon }) => {
  const dispatch = useDispatch();
  const initialShippingAddress = { street: '', city: '', state: '', phone: '' };
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [zalopayUrl, setZalopayUrl] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetModalState = () => {
    setShippingAddress(initialShippingAddress);
    setPaymentMethod('');
    setNotes('');
    setZalopayUrl(null);
    setViewState('form');
    setIsLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (isOpen) {
      // resetModalState(); 
    } else {
      resetModalState();
    }
  }, [isOpen]);

  const handleModalClose = () => {
    if (viewState === 'cod_thankyou' || viewState === 'zalopay_redirect') {
      dispatch(clearCart());
    }
    resetModalState();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentMethod) {
        setError("Please select a payment method.");
        return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const orderData = {
        items: items,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        notes: notes,
        appliedCoupon: coupon
      };
      const orderResponse = await createOrder(orderData);
      
      if (paymentMethod === "ZaloPay") {
        if (!orderResponse || !orderResponse._id) {
            throw new Error("Order ID is missing for ZaloPay processing.");
        }
        try {
          const zaloResponse = await createZaloPay(orderResponse._id);
          console.log('ZaloPay response:', zaloResponse);
          if (zaloResponse && zaloResponse.data && zaloResponse.data.payUrl) { 
            setZalopayUrl(zaloResponse.data.payUrl);
            setViewState('zalopay_redirect');
          } else {
            console.error('ZaloPay URL not found in response:', zaloResponse);
            setError('Failed to get ZaloPay payment URL. Please try again or choose another method.');
          }
        } catch (zaloError) {
          console.error('Error creating ZaloPay payment:', zaloError);
          setError('Error processing ZaloPay payment. Please try again.');
        }
      } else if (paymentMethod == "COD") {
        setViewState('cod_thankyou');
      }
    } catch (orderError) {
      console.error('Error creating order:', orderError);
      setError(`Error creating order: ${orderError instanceof Error ? orderError.message : String(orderError)}`);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        handleModalClose();
      }
    }}>
      <DialogContent className="sm:max-w-[425px] [&>button]:bg-transparent [&>button]:text-black [&>button]:hover:bg-transparent">
        {viewState === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle>Checkout Information</DialogTitle>
              <DialogDescription>
                Please provide your shipping details and payment method.
              </DialogDescription>
            </DialogHeader>
            {error && <p className="text-red-500 text-sm py-2">{error}</p>}
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  onValueChange={(value) => setPaymentMethod(value)}
                  value={paymentMethod} 
                  required
                  disabled={isLoading}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COD">COD (Cash on Delivery)</SelectItem>
                    <SelectItem value="ZaloPay">ZaloPay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                  placeholder="Add any notes for your order (optional)"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </>
        )}

        {viewState === 'zalopay_redirect' && zalopayUrl && (
          <>
            <DialogHeader className='flex justify-center items-center'>
              <DialogTitle>Proceed to ZaloPay</DialogTitle>
              <DialogDescription className='text-center'>
                Your order has been created. Click the button below to complete your payment with ZaloPay.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 text-center">
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <a href={zalopayUrl} target="_blank" rel="noopener noreferrer">
                  Pay with ZaloPay
                </a>
              </Button>
              <Button variant="outline" onClick={handleModalClose} className="mt-3 w-full text-white">
                Cancel Payment & Close
              </Button>
            </div>
          </>
        )}
         {viewState === 'zalopay_redirect' && !zalopayUrl && !isLoading && (
            <>
                <DialogHeader>
                    <DialogTitle>Payment Error</DialogTitle>
                    <DialogDescription>
                        There was an issue generating the ZaloPay payment link.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-6 text-center">
                    <p className="text-red-500 mb-4">
                        {error || "Could not retrieve ZaloPay URL. Please try again or select a different payment method."}
                    </p>
                    <Button onClick={() => setViewState('form')} className="w-full">
                        Back to Form
                    </Button>
                </div>
            </>
        )}

        {viewState === 'cod_thankyou' && (
          <>
            <DialogHeader>
              <DialogTitle>Thank You!</DialogTitle>
              <DialogDescription>
                Your order has been placed successfully.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 text-center">
              <p>We have received your order and will process it shortly. You will be contacted for confirmation.</p>
              <Button onClick={handleModalClose} className="mt-4 w-full">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;