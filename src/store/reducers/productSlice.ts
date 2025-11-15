import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ProductData {
  id?: number | null
  title: string | null
  price: number | null
  thumbnail: string | null
  rating: number | null
  discountPercentage: number | null
  brand?: string | null
  stock?: number | null
}

export interface ProductState {
  products: ProductData[]
  isLoading: boolean | null
  favorites: number[]
  storage: number[]
  hasMore: boolean
}

const initialState: ProductState = {
  products: [],
  isLoading: null,
  favorites: [],
  storage: [],
  hasMore: true,
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
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    toggleStorage: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.storage.includes(id)) {
        state.storage = state.storage.filter(storeId => storeId !== id);
      } else {
        state.storage.push(id);
      }
    },
  }
})

export default productSlice.reducer