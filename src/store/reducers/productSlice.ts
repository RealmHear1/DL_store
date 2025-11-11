import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ProductData {
  id?: number | null
  title: string | null
  price: number | null
  thumbnail: string | null
  rating: number | null
  discountPercentage: number | null
  brand?: string | null
}

export interface ProductState {
  products: ProductData[]
  isLoading: boolean | null
  favorites: number[]
}

const initialState: ProductState = {
  products: [],
  isLoading: null,
  favorites: [],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.products = action.payload
    },
    addProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.products.push(...action.payload)
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  }
})

export default productSlice.reducer