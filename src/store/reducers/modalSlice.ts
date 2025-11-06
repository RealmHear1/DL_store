import {createSlice} from "@reduxjs/toolkit";

interface ModalState {
  isActive: boolean
  isLoading: boolean
  error: string
}

const initialState: ModalState = {
  isActive: false,
  isLoading: false,
  error: ''
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeModalState(state) {
      state.isActive = !state.isActive
    }
  }
})

export default modalSlice.reducer;