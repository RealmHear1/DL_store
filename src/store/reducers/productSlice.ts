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
}

const initialState: ProductState = {
  products: [],
  isLoading: null
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
  }
})

export default productSlice.reducer