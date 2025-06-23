import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { clearCart } from '@/store/cartSlice';
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CheckoutModal from '@/components/modal/CheckoutModal'; // Import CheckoutModal
import { useTheme } from "@/context/ThemeContext";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    if (showThankYouMessage) {
      dispatch(clearCart());
    }
  }, [showThankYouMessage, dispatch]);

  const handleCloseCheckoutModal = () => {
    setIsCheckoutModalOpen(false);
  };

  const handleOrderSuccess = () => {
    setShowThankYouMessage(true);
    setIsCheckoutModalOpen(false); 
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-darkBackground text-darkText' : 'bg-white text-appleBlack'}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {!localStorage.getItem('token') ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Please log in to view your cart.</p>
            <Button
              className="bg-appleBlue text-white px-6 py-3 rounded-full text-base font-medium hover:bg-appleBlueHover transition-colors duration-200"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        ) : (
          <>
            <h1 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>Shopping Cart</h1>
            {showThankYouMessage ? (
              <div className="flex flex-col items-center justify-center py-10">
                <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Thank You for Your Order!</h2>
                <p className={`text-lg text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your order has been placed successfully. We have received your order and will process it shortly. You will be contacted for confirmation.
                </p>
                <Button
                  className="bg-appleBlue text-white px-6 py-3 rounded-full text-base font-medium hover:bg-appleBlueHover transition-colors duration-200 mt-6"
                  onClick={() => {
                    setShowThankYouMessage(false);
                    navigate('/');
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cartItems.length === 0 ? (
                <p className={`text-center py-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Your cart is empty.</p>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 ">
                  <div className={`lg:col-span-2 p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'}`}>
                    <Table>
                      <TableHeader>
                        <TableRow className={`${theme === 'dark' ? 'text-gray-300' : ''}`}>
                          <TableHead className="w-[40%] py-3 sm:py-4 pr-1 sm:pr-2">Product</TableHead>
                          <TableHead className="text-right w-[15%] py-3 sm:py-4">Price</TableHead>
                          <TableHead className="text-center w-[20%] py-3 sm:py-4">Quantity</TableHead>
                          <TableHead className="text-right w-[15%] py-3 sm:py-4">Total</TableHead>
                          <TableHead className="text-right w-[10%] py-3 sm:py-4 pr-2 sm:pr-4"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map(item => (
                          <CartItem key={item._id} item={item} />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="lg:col-span-1">
                    <Card className={`${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'}`}>
                      <CardHeader className={`p-4 ${theme === 'dark' ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                        <CardTitle className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>Order Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CartSummary onOrderSuccess={handleOrderSuccess} />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={handleCloseCheckoutModal}
        items={cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.selectedVariant?.price || item.price,
          _id: item.selectedVariant?._id || item._id,
        }))}
        coupon={null} 
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
};

export default Cart;
