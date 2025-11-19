import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface BasketItem {
  productId: number | null
  amount: number | null
}

interface BasketState {
  items: BasketItem[]
}

const initialState: BasketState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basketItems',
  initialState,
  reducers: {
    setBasketItems: (state, action: PayloadAction<BasketItem>) => {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].amount = action.payload.amount;
      } else {
        state.items.push({
          productId: action.payload.productId,
          amount: action.payload.amount
        });
      }
    }
  },
})

export default basketSlice.reducer