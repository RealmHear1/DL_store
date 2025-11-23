import classes from "../BasketPage/BasketPage.module.scss";
import classesProduct from "../../components/ProductCards/ProductCards.module.scss"
import classesFavourite from "./FavouritePage.module.scss"
import type {ProductData} from "../../store/reducers/productSlice.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import ProductCard from "../../components/UI/ProductCard/ProductCard.tsx";

const FavouritesPage = () => {

  const {products, favorites} = useAppSelector(state => state.productReducer)

  return (
    <div className={`${classes.basket__container} ${favorites.length === 0 ? classes['basket__container-empty'] : ''}`}>
      {
        favorites.length !== 0 ?
          <div className={classesFavourite.favourite__container}>
            <h2 className={`${classes['basket__container-header']} ${classesFavourite.favourite__header}`}>Избранное</h2>
            <div className={`${classes['basket__container-header--line']} ${classesFavourite.favourite__line}`}></div>
            <div className={`${classesProduct['product__cards--container']} ${classesFavourite.favourite__cards}`}>
              {
                products.filter(item => favorites.includes(item.id!)).map((product: ProductData) => <ProductCard
                  key={product.id} title={product.title} thumbnail={product.thumbnail} id={product.id} stock={product.stock}
                  price={product.price} rating={product.rating} discountPercentage={product.discountPercentage}/>)
              }
            </div>
          </div> :
            <div className={`${classes['basket-empty']}`}>
              <svg className={classes.basket__icon} width='100px' height='100px' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#ff4802" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              <p className={classes.bold__text}>В избранном пока пусто</p>
              <p className={`${classes.text__opacity} ${classes.text__width}`}>Добавляйте сюда всё, что понравилось. Так не придётся долго искать, когда захотите посмотреть или купить.</p>
            </div>
      }
    </div>
  );
};

export default FavouritesPage;