import {combineReducers, configureStore} from "@reduxjs/toolkit";
import modalReducer from './reducers/modalSlice.ts'
import authReducer from './reducers/authSlice.ts'
import productReducer from './reducers/productSlice.ts'
import basketReducer from './reducers/basketSlice.ts'

const rootReducer = combineReducers({
  modalReducer,
  authReducer,
  productReducer,
  basketReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']