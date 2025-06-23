import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/store/cartSlice'; 
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Plus, Image as ImageIcon } from "lucide-react"; 
import type { CartItem as CartItemType } from '@/store/cartSlice';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const cartItemId = item.selectedVariant ? `${item._id}-${item.selectedVariant._id}` : item._id;

  const handleRemoveItem = () => {
    dispatch(removeItem(cartItemId));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ 
        id: item._id, 
        quantity: newQuantity, 
        variantId: item.selectedVariant?._id 
      }));
    } else if (newQuantity === 0) { 
      dispatch(removeItem(cartItemId));
    }
  };

  const itemPrice = item.selectedVariant?.price || item.price;
  const totalPriceForItem = itemPrice * item.quantity;

  return (
    <TableRow key={cartItemId} className="align-top hover:bg-muted/50">
      <TableCell className="py-3 sm:py-4 pr-1 sm:pr-2">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded border bg-card flex-shrink-0 relative overflow-hidden">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
          </div>
          <div className="flex-grow pt-0.5">
            <p className="font-medium text-foreground text-sm leading-snug hover:text-primary transition-colors line-clamp-2">
              {item.name}
            </p>
            {item.selectedVariant && (
              <p className="text-xs text-muted-foreground mt-1">
                {item.selectedVariant.color} / {item.selectedVariant.capacity}
              </p>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell className="text-right py-3 sm:py-4 text-sm text-muted-foreground whitespace-nowrap">
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(itemPrice)}
      </TableCell>

      <TableCell className="text-center py-3 sm:py-4">
        <div className="flex items-center justify-center space-x-1 max-w-[120px] mx-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 0} 
          >
            <Minus className="h-3.5 w-3.5" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <Input
            type="number"
            min="0" 
            value={item.quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val >= 0) {
                handleQuantityChange(val);
              } else if (e.target.value === "") {
              }
            }}
            onBlur={(e) => { 
              const val = parseInt(e.target.value);
              if (isNaN(val) || e.target.value === "" || val < 1) {
                if (item.quantity > 0 && (isNaN(val) || val < 1 || e.target.value === "")) {
                     handleQuantityChange(1);
                }
              }
            }}
            className="h-7 sm:h-8 w-10 sm:w-12 text-center px-1 hide-arrows 
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= (item.selectedVariant?.stock ?? item.stock)}
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </TableCell>

      <TableCell className="text-right py-3 sm:py-4 font-semibold text-sm text-foreground whitespace-nowrap">
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceForItem)}
      </TableCell>

      {/* Remove Button */}
      <TableCell className="text-right py-3 sm:py-4 pr-2 sm:pr-4">
        <Button
          variant="ghost" // Ghost để ít chiếm diện tích hơn
          size="icon"
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          onClick={handleRemoveItem}
          aria-label="Remove item"
        >
          <X className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItem;