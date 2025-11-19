import  classes from "./ProductCard.module.scss"
import {
  type ProductData,
  productSlice
} from "../../../store/reducers/productSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import MyButton from "../MyButton/MyButton.tsx";
import {useNavigate} from "react-router-dom";

const ProductCard = ({price, title, rating, thumbnail, discountPercentage, id, stock}: ProductData) => {

  const {favorites, storage} = useAppSelector(state => state.productReducer)
  const dispatch = useAppDispatch()
  const {toggleFavorite, toggleStorage} = productSlice.actions
  const isFavourite = favorites.includes(id!)
  const inStorage = storage.includes(id!)
  const navigate = useNavigate()

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id!));
  };

  const openProductCardInfo = () => {
    navigate(`/catalog/${id}`)
  }

  const addToBasket = () => {
    inStorage ?
      navigate(`/basket`) :
      dispatch(toggleStorage(id!))
  }

  return (
    <div className={`${classes.product__card} ${(stock === 0) ? classes['product__card-stock--zero'] : ''}`}>
      <MyButton onClick={openProductCardInfo} className={`${classes['product__card-image']} ${classes.link_container}`}>
        <img alt='На фотосессии' src={`${thumbnail}`} className={`${classes['product__card-image']}`}/>
        <div className={classes.favourite__icon}>
          <svg width='30px' height='30px' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path onClick={handleClick} className={`${classes.favourite__button} ${isFavourite ? classes['favourite__button--clicked'] : ''}`} fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
      </MyButton>
      <div className={`${classes['product__card-price']}`}>
        {`${price}$`}
        {
          price ?
            <div className={`${classes['product__card-discount']}`}>
              <div className={`${classes['product__card-price--old']}`}>{`${discountPercentage ? (price*100/(100-discountPercentage)).toFixed(2) : ''}$`}</div>
              <div>{`–${discountPercentage?.toFixed(1)}%`}</div>
            </div> :
            ''
        }
      </div>
      <span className={`${classes['product__card-title']}`}>{title}</span>
      <div className={`${classes['product__card-rating']}`}>
        <svg fill="#FF6B35" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.987 511.987" xmlSpace="preserve" stroke="#ffd500"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M510.991,185.097c-2.475-7.893-9.301-13.632-17.515-14.72l-148.843-19.84L275.087,11.316 c-7.211-14.464-30.976-14.464-38.187,0l-69.547,139.221l-148.843,19.84c-8.213,1.088-15.04,6.827-17.515,14.72 c-2.496,7.872-0.213,16.512,5.867,22.101l107.392,98.923L85.604,486.857c-1.365,8.469,2.517,16.96,9.835,21.483 c7.339,4.501,16.661,4.203,23.616-0.811l136.939-97.792l136.939,97.792c3.691,2.667,8.043,3.989,12.395,3.989 c3.883,0,7.765-1.067,11.221-3.179c7.317-4.523,11.2-13.013,9.835-21.483l-28.651-180.736l107.392-98.923 C511.204,201.609,513.487,192.969,510.991,185.097z"></path> </g> </g> </g></svg>
        <span>{` ${rating}`}</span>
        <MyButton onClick={addToBasket} className={`${classes['product__card-storage']} ${inStorage ? classes['product__card-storage--in'] : ''}`}>
          {(stock === 0) ?
            <p>Нет в наличии</p> :
            inStorage ?
              <p>В корзине</p> :
              <p>В корзину</p>
          }
        </MyButton>
      </div>
    </div>
  );
};

export default ProductCard;