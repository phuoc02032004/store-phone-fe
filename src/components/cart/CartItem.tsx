import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/store/cartSlice';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { CartItem as CartItemType } from '@/store/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = (id: string, variantId?: string) => {
    const cartItemId = variantId ? `${id}-${variantId}` : id;
    dispatch(removeItem(cartItemId));
  };

  const handleQuantityChange = (id: string, quantity: number, variantId?: string) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity, variantId }));
    }
  };

  return (
    <TableRow key={item._id}>
      <TableCell className="font-medium flex items-center space-x-4 center">
        <span>{item.name}</span>
        {item.selectedVariant && (
          <div className="text-[12px] text-gray-500">
            ({item.selectedVariant.color}, {item.selectedVariant.capacity})
          </div>
        )}
      </TableCell>
      <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.selectedVariant?.price || item.price)}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.selectedVariant?._id)}
            disabled={item.quantity <= 1}
            className='bg-transparent border-2 border-gray-500'

          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item._id, Number(e.target.value), item.selectedVariant?._id)}
            className="w-16 text-center"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.selectedVariant?._id)}
            className='bg-transparent border-2 border-gray-500'

          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.selectedVariant?.price || item.price) * item.quantity)}</TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleRemoveItem(item._id, item.selectedVariant?._id)}
          className='text-white'
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;