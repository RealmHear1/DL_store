import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
interface AuthState {
  email: string | null
  displayName: string | null
  uid: string | null
  photoURL: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  email: null,
  displayName: null,
  uid: null,
  photoURL: null,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<Partial<AuthState> | null>) => {
        state.email = action.payload?.email ?? null;
        state.displayName = action.payload?.displayName ?? null;
        state.uid = action.payload?.uid ?? null;
        state.photoURL = action.payload?.photoURL ?? null;
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload
      },
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload
      }
    }
})

export default authSlice.reducer