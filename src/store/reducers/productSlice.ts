import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ProductData {
  id: number | null
  title: string | null
  price: number | null
  thumbnail: string | null
  rating: number | null
  brand?: string | null
}

export interface ProductState {
  products: ProductData[]
}

const initialState: ProductState = {
  products: []
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
    }
  }
})

export default productSlice.reducer