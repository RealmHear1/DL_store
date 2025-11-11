import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import ProductCard from "../UI/ProductCard/ProductCard.tsx";
import classes from "./ProductCards.module.scss";
import {
  type ProductData,
  productSlice
} from "../../store/reducers/productSlice.ts";
import {useEffect, useRef, useState} from "react";
import {LIMIT} from "../../utils/CONSTANTS.ts";
import Loader from "../UI/Loader/Loader.tsx";

const ProductCards = () => {

  const dispatch = useAppDispatch()
  const {setProducts, addProducts, setIsLoading} = productSlice.actions
  const {products, isLoading} = useAppSelector(state => state.productReducer)
  const [page, setPage] = useState<number>(2)

  const divObservedElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const loadInitialProducts = async () => {
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
    loadInitialProducts()
  }, [dispatch]);

  useEffect(() => {
    if (page === 2) return;
    const loadMoreProducts = async () => {
      try {
        const skip = page * LIMIT;
        dispatch(setIsLoading(true))
        const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
        const data = await response.json()
        dispatch(addProducts(data.products))
      } catch (error) {
        console.error('Ошибка при загрузке дополнительных товаров:', error)
      } finally {
        dispatch(setIsLoading(false));
      }
    }
    loadMoreProducts()
  }, [page, dispatch])

  useEffect(() => {
    if (!divObservedElement.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );
    observer.observe(divObservedElement.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${classes['product__cards--container']}`}>
      {products.map((product: ProductData) => <ProductCard
        key={product.id} title={product.title} thumbnail={product.thumbnail}
        price={product.price} rating={product.rating} discountPercentage={product.discountPercentage}/>)
      }
      {isLoading && (
        <div className={classes.loader__wrapper}>
          <Loader/>
        </div>
      )}
      <div ref={divObservedElement}></div>
    </div>
  );
};

export default ProductCards;