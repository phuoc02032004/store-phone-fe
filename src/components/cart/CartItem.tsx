import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/store/cartSlice';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";

import type { CartItem as CartItemType } from '@/store/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

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
    <TableRow key={item._id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}>
      <TableCell className={`font-medium flex items-center space-x-4 center ${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>
        <span >{item.name}</span>
        {item.selectedVariant && (
          <div className={`text-[12px] ${theme === 'dark' ? 'text-gray-300' : 'text-lightText'}`}>
            ({item.selectedVariant.color}, {item.selectedVariant.capacity})
          </div>
        )}
      </TableCell>
      <TableCell className={`${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.selectedVariant?.price || item.price)}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.selectedVariant?._id)}
            disabled={item.quantity <= 1}
            className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-transparent border-2 !border-lightText !text-lightText'}`}
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(item._id, Number(e.target.value), item.selectedVariant?._id)}
            className={`w-16 text-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : '!text-lightText'}`}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.selectedVariant?._id)}
            className={`${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-transparent border-2 !border-lightText !text-lightText'}`}
          >
            +
          </Button>
        </div>
      </TableCell>
      <TableCell className={`${theme === 'dark' ? 'text-white' : 'text-lightText'}`}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((item.selectedVariant?.price || item.price) * item.quantity)}</TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleRemoveItem(item._id, item.selectedVariant?._id)}
          className={`${theme === 'dark' ? 'bg-red-600 hover:bg-red-700 text-white' : 'text-white !bg-lightText'}`}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;