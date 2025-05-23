import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CheckoutModal from "@/components/modal/CheckoutModal"; 
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

interface CartSummaryProps {
}

const CartSummary: React.FC<CartSummaryProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items); 

  const transformedItems = cartItems.map(item => ({
    product: item._id,
    quantity: item.quantity,
    price: item.price,
    _id: item._id
  }));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <Separator />
      <div className="flex justify-center items-center text-2xl font-bold ">
      <CheckoutModal isOpen={isModalOpen} onClose={closeModal} items={transformedItems} />
        <span className='text-center font-bold'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
      </div>
      <div className="flex justify-center">
        <Button size="lg" className="w-full md:w-auto" onClick={openModal}>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartSummary;