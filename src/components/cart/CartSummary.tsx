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
import { useTheme } from "@/context/ThemeContext";

interface CartSummaryProps {
  onOrderSuccess: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onOrderSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { theme } = useTheme();

  const transformedItems = cartItems.map(item => ({
    product: item._id,
    quantity: item.quantity,
    price: item.selectedVariant?.price || item.price, 
    _id: item._id,
    ...(item.selectedVariant && { variantId: item.selectedVariant._id }) 
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

  const total = subtotal - discount;

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code.');
      return;
    }
    try {
      const response = await getCouponByCode(couponCode);
      const applyResponse = await applyCoupon(couponCode);
      console.log(applyResponse);

      setAppliedCoupon(response);
      toast.success(`Coupon "${couponCode}" applied successfully!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to apply coupon or coupon not found.');
      setAppliedCoupon(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className={`flex-grow ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : '!border-lightText !text-lightText'}`}
        />
        <Button variant={'outline'} onClick={handleApplyCoupon} className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'text-white !bg-lightText'}`}>Apply</Button>
      </div>
      {appliedCoupon && (
        <div className="text-sm text-green-600">
          Coupon applied: {appliedCoupon.code} (-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)})
        </div>
      )}
      <Separator className={`${theme === 'dark' ? 'bg-gray-700' : ''}`} />
      <div className={`flex justify-between items-center text-lg ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>
        <span>Subtotal:</span>
        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
      </div>
      {appliedCoupon && (
        <div className="flex justify-between items-center text-lg text-green-600">
          <span>Discount:</span>
          <span>-{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)}</span>
        </div>
      )}
      <Separator className={`${theme === 'dark' ? 'bg-gray-700' : ''}`} />
      <div className={`flex justify-between items-center text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>
        <span>Total:</span>
        <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
      </div>
      <div className="flex justify-center">
        <Button size="lg" className={`w-full md:w-auto ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-white !bg-lightText'}`} onClick={openModal}>Proceed to Checkout</Button>
      </div>
      <CheckoutModal isOpen={isModalOpen} onClose={closeModal} items={transformedItems} coupon={appliedCoupon ? appliedCoupon.code : null} onOrderSuccess={onOrderSuccess} />
    </div>
  );
};

export default CartSummary;