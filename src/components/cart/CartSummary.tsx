import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import CheckoutModal from "@/components/modal/CheckoutModal";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { getCouponByCode, applyCoupon } from '@/api/coupon';
import { toast } from 'sonner';
import type { Coupon } from '@/types/Coupon';
import { TagIcon, TicketPercentIcon, CheckCircle, XIcon } from 'lucide-react'; // Thêm XIcon

interface CartSummaryProps {
  onOrderSuccess: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onOrderSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const transformedItems = cartItems.map(item => ({
    product: item._id,
    quantity: item.quantity,
    price: item.selectedVariant?.price || item.price,
    _id: item.selectedVariant?._id || item._id,
  }));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.selectedVariant?.price || item.price) * item.quantity, 0);
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.type === 'PERCENTAGE_DISCOUNT') {
      discount = subtotal * (appliedCoupon.value / 100);
      if (appliedCoupon.maxDiscountValue && discount > appliedCoupon.maxDiscountValue) {
        discount = appliedCoupon.maxDiscountValue;
      }
    } else if (appliedCoupon.type === 'FIXED_AMOUNT_DISCOUNT') {
      discount = appliedCoupon.value;
    }
  }

  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code.');
      return;
    }
    setIsApplyingCoupon(true);
    try {
      const response = await getCouponByCode(couponCode);
      // Giữ nguyên logic gọi applyCoupon của bạn
      const applyResponse = await applyCoupon(couponCode); 
      console.log(applyResponse);

      setAppliedCoupon(response);
      toast.success(`Coupon "${response.code}" applied successfully!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to apply coupon or coupon not found.');
      setAppliedCoupon(null);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    toast.info("Coupon removed.");
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="cart-coupon-code" className="text-sm font-medium text-muted-foreground flex items-center">
          <TicketPercentIcon className="w-4 h-4 mr-2" />
          Discount Code
        </label>
        <div className="flex items-center space-x-2">
          <Input
            id="cart-coupon-code"
            type="text"
            placeholder="Enter coupon"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            className="flex-grow"
            disabled={isApplyingCoupon || !!appliedCoupon}
          />
          {!appliedCoupon ? (
            <Button 
              variant="outline" 
              onClick={handleApplyCoupon} 
              disabled={isApplyingCoupon || !couponCode.trim()}
              className="whitespace-nowrap px-4"
            >
              {isApplyingCoupon ? (
                <TagIcon className="mr-2 h-4 w-4 animate-spin" /> 
              ) : (
                <TagIcon className="mr-2 h-4 w-4" />
              )}
              Apply
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              onClick={handleRemoveCoupon}
              size="sm"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive px-2"
            >
              <XIcon className="w-4 h-4 mr-1 sm:mr-1.5" /> Remove
            </Button>
          )}
        </div>
        {appliedCoupon && (
          <div className="text-xs text-green-600 dark:text-green-500 flex items-center pt-1">
            <CheckCircle className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
            <span>
              Applied: <span className="font-semibold">{appliedCoupon.code}</span> (-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)})
            </span>
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="text-foreground font-medium">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}
          </span>
        </div>
        
        {appliedCoupon && discount > 0 && (
          <div className="flex justify-between items-center text-green-600 dark:text-green-500">
            <span>Discount ({appliedCoupon.code}):</span>
            <span className="font-medium">
              -{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)}
            </span>
          </div>
        )}
      </div>
      
      <Separator />

      <div className="flex justify-between items-center text-xl font-bold text-foreground">
        <span>Total:</span>
        <span>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
        </span>
      </div>

      <div className="pt-2">
        <Button 
          size="lg" 
          className="w-full text-base font-semibold"
          onClick={openModal}
          disabled={cartItems.length === 0 || isApplyingCoupon}
        >
          Proceed to Checkout
        </Button>
      </div>

      <CheckoutModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        items={transformedItems} 
        coupon={appliedCoupon ? appliedCoupon.code : null}
        onOrderSuccess={onOrderSuccess} 
      />
    </div>
  );
};

export default CartSummary;