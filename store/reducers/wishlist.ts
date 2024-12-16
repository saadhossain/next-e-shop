import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductStoreType } from 'types';

interface WishlistTypes {
  wishlistItems: ProductStoreType[]
}

const initialState = {
  wishlistItems: []
} as WishlistTypes;

const indexSameProduct = (state: WishlistTypes, action: ProductStoreType) => {
  const sameProduct = (product: ProductStoreType) => (
    product.id === action.id &&
    product.color === action.color &&
    product.size === action.size
  );

  return state.wishlistItems.findIndex(sameProduct)
};

type AddToWishlistType = {
  product: ProductStoreType
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<AddToWishlistType>) => {
      // find index of product
      const index = indexSameProduct(state, action.payload.product);

      if (index !== -1) {
        console.log('Product already exists in the Wishlist.')
        return;
      }

      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload.product]
      };
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      const remainingIemsAfterRemove = state.wishlistItems.filter((item: ProductStoreType) => item.id !== action.payload);
      state.wishlistItems = remainingIemsAfterRemove
    },
  },
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer