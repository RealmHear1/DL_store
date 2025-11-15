import  classes from "../ProductCard/ProductCard.module.scss"
import classesBasket from "./BasketCard.module.scss"
import {
  type ProductData,
  productSlice
} from "../../../store/reducers/productSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import MyButton from "../MyButton/MyButton.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {
  handleChange, handleClickDecrement,
  handleClickIncrement
} from "../../../utils/handleFunctions.ts";

const BasketCard = ({price, title, thumbnail, discountPercentage, id, stock}: ProductData) => {

  const dispatch = useAppDispatch()
  const {favorites, storage} = useAppSelector(state => state.productReducer)
  const isFavourite = favorites.includes(id!)
  const {toggleFavorite, toggleStorage} = productSlice.actions
  const navigate = useNavigate()
  const [countProduct, setCountProduct] = useState<number>(1)

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id!));
  };

  const openProductCardInfo = () => {
    navigate(`/catalog/${id}`)
  }



  return (
    <div className={classes.product__card}>
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
              <div className={`${classes['product__card-price--old']}`}>{`${discountPercentage ? (price*100/(100-discountPercentage)).toFixed(0) : ''}.99$`}</div>
            </div> :
            ''
        }
      </div>
      <span className={`${classes['product__card-title']}`}>{title}</span>
      {stock ?
        <div className={classesBasket.product__amount}>
          <div className={classesBasket.operations__container} onClick={() => handleClickDecrement(countProduct, setCountProduct)}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
          <input maxLength={2} type='text' onChange={(event) => handleChange(event, setCountProduct, stock)} value={countProduct} autoComplete='off' className={`${classesBasket['product__amount-input']}`}/>
          <div className={classesBasket.operations__container} onClick={() => handleClickIncrement(countProduct, setCountProduct, stock)}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </div>
        </div> :
        <div>
          Нет в наличии
        </div>
      }
      <span>
        {
          (stock! < 100 && stock! > 0) ?
            <p>{`Осталось ${stock} ${(stock! % 10 === 1) ? 'товар' : (stock! % 10 === 2 || stock! % 10 === 3 || stock! % 10 === 4) ? 'товара' :
              'товаров'
            }`}</p> :
            ''
        }
      </span>
    </div>
  );
};

export default BasketCard;