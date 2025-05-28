import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/Product';

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: {
    color: string;
    capacity: string;
    price: number;
    stock: number;
    sku: string;
    _id: string;
  };
}

interface CartState {
  items: CartItem[];
  itemCount: number;
}

const initialState: CartState = {
  items: [],
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; quantity: number; selectedVariant?: CartItem['selectedVariant'] }>) => {
      const { product, quantity, selectedVariant } = action.payload;
      
      const cartItemId = selectedVariant ? `${product._id}-${selectedVariant._id}` : product._id;

      const existingItem = state.items.find(item => {
        const existingCartItemId = item.selectedVariant ? `${item._id}-${item.selectedVariant._id}` : item._id;
        return existingCartItemId === cartItemId;
      });

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity, selectedVariant });
      }

      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => {
        const existingCartItemId = item.selectedVariant ? `${item._id}-${item.selectedVariant._id}` : item._id;
        return existingCartItemId !== action.payload;
      });
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number; variantId?: string }>) => {
      const { id, quantity, variantId } = action.payload;
      const cartItemId = variantId ? `${id}-${variantId}` : id;

      const itemToUpdate = state.items.find(item => {
        const existingCartItemId = item.selectedVariant ? `${item._id}-${item.selectedVariant._id}` : item._id;
        return existingCartItemId === cartItemId;
      });

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
              state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItemCount = (state: { cart: CartState }) => state.cart.itemCount;

export default cartSlice.reducer;