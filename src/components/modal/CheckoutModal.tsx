import React, { useState, useEffect } from 'react';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { createOrder } from '@/api/order';
import { createZaloPay } from '@/api/zalopay';
import { Loader2, AlertCircle, ExternalLink, ArrowLeft } from 'lucide-react';

interface CheckoutItem {
  product: string;
  quantity: number;
  price: number;
  _id: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CheckoutItem[];
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
    if (!isOpen) {
      resetModalState();
    }
  }, [isOpen]);

  const handleModalClose = () => {
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
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          _id: item._id,
          ...(item.product !== item._id && { variantId: item._id })
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
      } else if (paymentMethod === "COD") {
        if (onOrderSuccess) {
          onOrderSuccess();
        }
        handleModalClose(); 
      }
    } catch (orderError) {
      console.error('Error creating order:', orderError);
      setError(`Error creating order: ${orderError instanceof Error ? orderError.message : String(orderError)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormContent = () => (
    <>
      <DialogHeader className="px-6 pt-6 pb-4 border-b">
        <DialogTitle className="text-xl">Checkout Information</DialogTitle>
        <DialogDescription>
          Please provide your shipping details and payment method to complete your order.
        </DialogDescription>
      </DialogHeader>

      <form id="checkout-form" onSubmit={handleSubmit} className="px-6 py-4 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar">
        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        
        <h3 className="text-md font-semibold text-foreground pt-1">Shipping Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" value={shippingAddress.street} onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} required disabled={isLoading} />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="city">City</Label>
                <Input id="city" value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} required disabled={isLoading} />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="state">State / Province</Label>
                <Input id="state" value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} required disabled={isLoading} />
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} required disabled={isLoading} placeholder="e.g., 0912345678" />
            </div>
        </div>

        <h3 className="text-md font-semibold text-foreground pt-2">Payment & Notes</h3>
        <div className="grid gap-4">
            <div className="grid gap-1.5">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select onValueChange={(value) => setPaymentMethod(value)} value={paymentMethod} required disabled={isLoading}>
                    <SelectTrigger id="paymentMethod">
                        <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="COD">COD (Cash on Delivery)</SelectItem>
                        <SelectItem value="ZaloPay">ZaloPay</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-1.5">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea id="notes" value={notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)} placeholder="Any special instructions for your order?" disabled={isLoading} rows={3} />
            </div>
        </div>
      <DialogFooter className="px-6 pb-6 pt-4 border-t">
        <Button variant="outline" onClick={handleModalClose} disabled={isLoading}>Cancel</Button>
        <Button type="submit" form="checkout-form" className="min-w-[120px]" disabled={isLoading || !paymentMethod.trim()}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? 'Processing...' : 'Place Order'}
        </Button>
      </DialogFooter>
      </form>
    </>
  );

  const renderZaloPayRedirect = () => (
    <>
      <DialogHeader className="px-6 pt-6 pb-4 text-center">
        <DialogTitle className="text-xl">Proceed to ZaloPay</DialogTitle>
        <DialogDescription>
          Your order is confirmed. Click below to complete your payment securely with ZaloPay.
        </DialogDescription>
      </DialogHeader>
      <div className="px-6 py-8 text-center space-y-4">
        <Button asChild size="lg" className="w-full text-base font-semibold">
          <a href={zalopayUrl!} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-5 w-5" />
            Pay with ZaloPay
          </a>
        </Button>
        <Button variant="outline" onClick={handleModalClose} className="w-full">
          Cancel Payment & Close
        </Button>
      </div>
    </>
  );

  const renderZaloPayError = () => (
    <>
      <DialogHeader className="px-6 pt-6 pb-4 text-center">
        <DialogTitle className="text-xl text-destructive">Payment Link Error</DialogTitle>
        <DialogDescription>
          We encountered an issue generating the ZaloPay payment link.
        </DialogDescription>
      </DialogHeader>
      <div className="px-6 py-8 text-center space-y-4">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-3" />
        <p className="text-destructive-foreground text-sm">
          {error || "Could not retrieve the ZaloPay URL. Please try again or select a different payment method."}
        </p>
        <Button onClick={() => { setViewState('form'); setError(null); }} className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
        </Button>
      </div>
    </>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) { handleModalClose(); } }}>
      <DialogContent className="sm:max-w-md md:max-w-lg p-0 overflow-hidden">
        {viewState === 'form' && renderFormContent()}
        {viewState === 'zalopay_redirect' && zalopayUrl && renderZaloPayRedirect()}
        {viewState === 'zalopay_redirect' && !zalopayUrl && !isLoading && renderZaloPayError()}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;