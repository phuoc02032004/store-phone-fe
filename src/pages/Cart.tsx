import React from "react";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      {!localStorage.getItem('token') ? (
        <Button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      ) : (
        <Card className="shadow-lg rounded-lg">
        <CardHeader className="bg-gray-100 border-b border-gray-200 p-6">
          <CardTitle className="text-2xl font-bold text-gray-800">Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
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
        </CardContent>
      </Card>
      )}
    </div>
  );
};

export default Cart;
