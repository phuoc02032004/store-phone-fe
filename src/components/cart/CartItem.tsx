import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/store/cartSlice';
import type { Product } from '@/types/Product';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <TableRow key={item._id}>
      <TableCell className="font-medium flex items-center space-x-4 center">
        <span>{item.name}</span>
      </TableCell>
      <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className='bg-transparent border-2 border-gray-500'

          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
            className="w-16 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
            className='bg-transparent border-2 border-gray-500'

          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleRemoveItem(item._id)}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;