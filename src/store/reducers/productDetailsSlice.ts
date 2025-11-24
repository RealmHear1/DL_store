import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface ProductDetailsData {
  id: number
  brand: string
  category: string
  description: string
  discountPercentage: number
  images: string[]
  price: number
  rating: number
  reviews: Array<{
    rating: number
    comment: string
    reviewerName: string
    reviewerEmail: string
    date: string
  }>
  shippingInformation?: string
  stock?: number
  tags?: string[]
  thumbnail: string
  title: string
}

export interface ProductDetailsState {
  items: Record<number, ProductDetailsData>
  isLoading: boolean
  error: string | null
}

const initialState: ProductDetailsState = {
  items: {},
  isLoading: false,
  error: null,
}

export const productDetailsSlice = createSlice({
  name: 'productsDetails',
  initialState: initialState,
  reducers: {
    setItems: (state: ProductDetailsState, action: PayloadAction<ProductDetailsData>) => {
      state.items[action.payload.id] = action.payload
    },
    setIsLoading: (state: ProductDetailsState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state: ProductDetailsState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  }
})

export default productDetailsSlice.reducer