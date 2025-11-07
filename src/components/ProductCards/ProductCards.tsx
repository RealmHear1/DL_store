import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import ProductCard from "../UI/ProductCard/ProductCard.tsx";
import classes from "../UI/ProductCard/ProductCard.module.scss";
import MyButton from "../UI/MyButton/MyButton.tsx";
import {
  type ProductData,
  productSlice
} from "../../store/reducers/productSlice.ts";
import {useEffect} from "react";

const ProductCards = () => {

  const dispatch = useAppDispatch()
  const {setProducts, addProducts} = productSlice.actions
  const {products} = useAppSelector(state => state.productReducer)

  const productCardResponse = async (limit: number): Promise<ProductData[]> => {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
    const data = await response.json()
    return data.products
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productCardResponse(10)
        dispatch(setProducts(data))
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      {products.map((product) => <ProductCard />)}
    </div>
  );
};

export default ProductCards;