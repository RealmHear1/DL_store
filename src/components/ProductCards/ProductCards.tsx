import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import ProductCard from "../UI/ProductCard/ProductCard.tsx";
import classes from "./ProductCards.module.scss";
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
        const data = await productCardResponse(1000)
        dispatch(setProducts(data))
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={`${classes['product__cards--container']}`}>
      {products.map((product: ProductData) => <ProductCard
        key={product.id} title={product.title} thumbnail={product.thumbnail}
        price={product.price} rating={product.rating} discountPercentage={product.discountPercentage}/>)
      }
    </div>
  );
};

export default ProductCards;