import {LIMIT} from "../../utils/CONSTANTS.ts";
import {productSlice} from "../../store/reducers/productSlice.ts";

const {setProducts, addProducts, setIsLoading, setHasMore} = productSlice.actions

export const loadInitialProducts = async (dispatch: any) => {
  try {
    dispatch(setIsLoading(true))
    const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT * 2}`);
    const data = await response.json()
    dispatch(setProducts(data.products))
  } catch (error) {
    console.error('Ошибка при загрузке начальных товаров:', error)
  } finally {
    dispatch(setIsLoading(false));
  }
}

export const loadMoreProducts = async (page: number, dispatch: any, hasMore: boolean) => {
  try {
    const skip = page * LIMIT;
    dispatch(setIsLoading(true))
    if (!hasMore) return;
    const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
    const data = await response.json()
    if (data.products.length === 0) {
      dispatch(setHasMore(false))
      return
    }
    dispatch(addProducts(data.products))
  } catch (error) {
    console.error('Ошибка при загрузке дополнительных товаров:', error)
  } finally {
    dispatch(setIsLoading(false));
  }
}