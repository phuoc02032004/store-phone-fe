import React from "react";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
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

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {!localStorage.getItem('token') ? (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg text-gray-600 mb-4">Please log in to view your cart.</p>
            <Button
              className="bg-[#0071e3] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#0077ed] transition-colors duration-200"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 ">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)] backdrop-blur-[10px] border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead></TableHead>
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
                  <Card className="bg-gray-50
                  bg-gradient-to-tr from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0)]
                  backdrop-blur-[10px]
                  border border-[rgba(255,255,255,0.18)]
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ">
                    <CardHeader className="border-b border-gray-200 p-4">
                      <CardTitle className="text-xl font-semibold text-gray-700">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <CartSummary />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
