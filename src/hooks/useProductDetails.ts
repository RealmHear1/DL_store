import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./redux.ts";
import {productDetailsSlice} from "../store/reducers/productDetailsSlice.ts";

export const useProductDetails = (id: number | string | undefined) => {
  const numericId = Number(id)

  const dispatch = useAppDispatch()
  const {setItems, setIsLoading, setError} = productDetailsSlice.actions
  const {isLoading, error, items} = useAppSelector(state => state.productDetailsReducer)

  useEffect(() => {
    if (!numericId) return
    if (items[numericId]) return
    const fetchDetailsData = async () => {
      try {
        dispatch(setIsLoading(true))
        const response = await fetch(`https://dummyjson.com/products/${numericId}`)
        const data = await response.json()
        dispatch(setItems(data))
      } catch (e) {
        dispatch(setError(e instanceof Error ? e.message : String(e)))
      } finally {
        dispatch(setIsLoading(false))
      }
    }
    fetchDetailsData()
  }, [numericId]);
  return {
    product: items[numericId],
    isLoading,
    error
  }
}