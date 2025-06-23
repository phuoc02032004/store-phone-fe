import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createOrder } from '@/api/order';
import { createZaloPay } from '@/api/zalopay';
import { useTheme } from "@/context/ThemeContext";

import type { Items } from '@/types/Order';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Items[];
  coupon: string | null;
  onOrderSuccess: () => void; 
}

type ViewState = 'form' | 'zalopay_redirect'; 

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, items, coupon, onOrderSuccess }) => {
  const initialShippingAddress = { street: '', city: '', state: '', phone: '' };
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [zalopayUrl, setZalopayUrl] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>('form');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

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
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          _id: item._id,
          ...(item.product._id && { variantId: item.product._id }) // Assuming variantId is product._id for simplicity, adjust if needed
        })),
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
        if (onOrderSuccess) {
          onOrderSuccess();
        }
        onClose();
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
      <DialogContent className={`sm:max-w-[425px] [&>button]:bg-transparent ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : '[&>button]:text-lightText [&>button]:hover:bg-transparent'}`}>
        {viewState === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle className={`${theme === 'dark' ? 'text-white' : ''}`}>Checkout Information</DialogTitle>
              <DialogDescription className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>
                Please provide your shipping details and payment method.
              </DialogDescription>
            </DialogHeader>
            {error && <p className="text-red-500 text-sm py-2">{error}</p>}
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="street" className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>Street</Label>
                <Input
                  id="street"
                  value={shippingAddress.street}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  required
                  disabled={isLoading}
                  className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city" className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>City</Label>
                <Input
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  required
                  disabled={isLoading}
                  className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state" className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>State</Label>
                <Input
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  required
                  disabled={isLoading}
                  className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  required
                  disabled={isLoading}
                  className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="paymentMethod" className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>Payment Method</Label>
                <Select
                  onValueChange={(value) => setPaymentMethod(value)}
                  value={paymentMethod}
                  required
                  disabled={isLoading}
                >
                  <SelectTrigger id="paymentMethod" className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent className={`${theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : ''}`}>
                    <SelectItem value="COD" className={`${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}>COD (Cash on Delivery)</SelectItem>
                    <SelectItem value="ZaloPay" className={`${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}>ZaloPay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes" className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>Notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                  placeholder="Add any notes for your order (optional)"
                  disabled={isLoading}
                  className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                />
              </div>
              <Button type="submit" className={`w-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-white'}`} disabled={isLoading}>
                {isLoading ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </>
        )}

        {viewState === 'zalopay_redirect' && zalopayUrl && (
          <>
            <DialogHeader className='flex justify-center items-center'>
              <DialogTitle className={`${theme === 'dark' ? 'text-white' : ''}`}>Proceed to ZaloPay</DialogTitle>
              <DialogDescription className={`text-center ${theme === 'dark' ? 'text-gray-300' : ''}`}>
                Your order has been created. Click the button below to complete your payment with ZaloPay.
              </DialogDescription>
            </DialogHeader>
            <div className="py-6 text-center">
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <a href={zalopayUrl} target="_blank" rel="noopener noreferrer">
                  Pay with ZaloPay
                </a>
              </Button>
              <Button variant="outline" onClick={handleModalClose} className={`mt-3 w-full ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'text-white'}`}>
                Cancel Payment & Close
              </Button>
            </div>
          </>
        )}
         {viewState === 'zalopay_redirect' && !zalopayUrl && !isLoading && (
            <>
                <DialogHeader>
                    <DialogTitle className={`${theme === 'dark' ? 'text-white' : ''}`}>Payment Error</DialogTitle>
                    <DialogDescription className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>
                        There was an issue generating the ZaloPay payment link.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-6 text-center">
                    <p className="text-red-500 mb-4">
                        {error || "Could not retrieve ZaloPay URL. Please try again or select a different payment method."}
                    </p>
                    <Button onClick={() => setViewState('form')} className={`w-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                        Back to Form
                    </Button>
                </div>
            </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;