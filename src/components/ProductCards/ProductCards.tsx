import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import ProductCard from "../UI/ProductCard/ProductCard.tsx";
import classes from "./ProductCards.module.scss";
import {
  type ProductData,
} from "../../store/reducers/productSlice.ts";
import {useEffect, useRef, useState} from "react";
import Loader from "../UI/Loader/Loader.tsx";
import {
  loadInitialProducts,
  loadMoreProducts
} from "../../API/GetService/ProductCardsService.ts";
import {useInfiniteScroll} from "../../hooks/useInfiniteScroll.ts";

const ProductCards = () => {

  const {products, isLoading, hasMore} = useAppSelector(state => state.productReducer)
  const [page, setPage] = useState<number>(1)
  const dispatch = useAppDispatch()
  const divObservedElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    loadInitialProducts(dispatch)
  }, [dispatch]);

  useEffect(() => {
    if (page === 1) return;
    loadMoreProducts(page, dispatch, hasMore)
  }, [page, dispatch])

  useInfiniteScroll<HTMLDivElement>({
      isLoading: isLoading,
      targetRef: divObservedElement,
    onIntersect: () => {
      if (hasMore) {
        setPage((prevState) => prevState + 1);
      }
    }
  })

  return (
    <div className={`${classes['product__cards--container']}`}>
      {products.map((product: ProductData) => <ProductCard
        key={product.id} title={product.title} thumbnail={product.thumbnail} id={product.id} stock={product.stock}
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