import  classes from "../ProductCard/ProductCard.module.scss"
import classesBasket from "./BasketCard.module.scss"
import {
  type ProductData,
  productSlice
} from "../../../store/reducers/productSlice.ts";
import {basketSlice} from "../../../store/reducers/basketSlice.ts";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import MyButton from "../MyButton/MyButton.tsx";
import {useNavigate} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import {
  handleChange, handleClickDecrement,
  handleClickIncrement
} from "../../../utils/handleFunctions.ts";

const BasketCard = ({price, title, thumbnail, discountPercentage, id, stock}: ProductData) => {
  
  const {items} = useAppSelector(state => state.basketReducer)
  const dispatch = useAppDispatch()
  const {favorites} = useAppSelector(state => state.productReducer)
  const isFavourite = favorites.includes(id!)
  const {toggleFavorite, toggleStorage} = productSlice.actions
  const navigate = useNavigate()
  const basketItem = items.find(item => item.productId === id);
  const [countProduct, setCountProduct] = useState<number>(basketItem?.amount ?? 1)
  const {setBasketItems} = basketSlice.actions
  const initialPrice = (price ?? 0) * (basketItem?.amount ?? 1)
  const [displayPrice, setDisplayPrice] = useState<number>(initialPrice)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    dispatch(setBasketItems({productId: id!, amount: countProduct}))
  }, [countProduct, id, dispatch])

  useEffect(() => {
    if (price == null) {
      setDisplayPrice(0)
      return
    }
    const startValue = displayPrice
    const targetValue = (price ?? 0) * countProduct
    const duration = 250
    const startTime = performance.now()
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const nextValue = startValue + (targetValue - startValue) * progress
      setDisplayPrice(nextValue)
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [countProduct, price])

  const handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id!));
  };

  const handleChangeInput = (event: any) => {
    handleChange(event, setCountProduct, stock!)
  }

  const openProductCardInfo = () => {
    navigate(`/catalog/${id}`)
  }

  const deleteFromBasket = () => {
    dispatch(toggleStorage(id!))
  }

  return (
    <div className={`${classesBasket.basket__card} ${(stock === 0) ? classesBasket['basket__card-stock--zero'] : ''}`}>
      <MyButton onClick={openProductCardInfo} className={`${classesBasket['basket__card-image--container']} ${classes.link_container}`}>
        <img alt='На фотосессии' src={`${thumbnail}`} className={`${classesBasket['basket__card-image']}`}/>
      </MyButton>
      <div className={`${classesBasket['basket__card-info']}`}>
        <div className={`${classesBasket['basket__card-info--block1']}`}>
          <span className={`${classes['product__card-title']}`}>{title}</span>
          <div>
            <div className={classesBasket.product__stock}>
              {
                (stock! < 100 && stock! > 0) ?
                  <p>{`${(stock! % 10 === 1) ? 'Осталась' : 'Осталось'} ${stock} шт.`}</p> :
                  <p className={`${classesBasket['basket__card-stock--zero']}`}>Нет в наличии</p>
              }
            </div>
            <div className={classesBasket.basket__icons}>
              <svg width='30px' height='30px' viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path onClick={handleClick} className={`${classes.favourite__button} ${isFavourite ? classes['favourite__button--clicked'] : ''}`} fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              <svg width="30px" height="30px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path onClick={deleteFromBasket} className={`${classes.favourite__button}`} d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
          </div>
        </div>
        <div>
          {stock ?
            <div className={classesBasket.product__amount}>
              <div className={classesBasket.operations__container} onClick={() => handleClickDecrement(countProduct, setCountProduct)}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <input maxLength={2} type='text' onChange={(event) => handleChangeInput(event)} value={countProduct} autoComplete='off' className={`${classesBasket['product__amount-input']}`}/>
              <div className={classesBasket.operations__container} onClick={() => handleClickIncrement(countProduct, setCountProduct, stock)}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
            </div> :
            <div className={`${classesBasket.product__amount}`}>
              <div className={`${classesBasket.operations__container} ${classesBasket['operations__container-stock--zero']}`}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
              <p className={`${classesBasket['product__amount-input--zero']}`}>0</p>
              <div className={`${classesBasket.operations__container} ${classesBasket['operations__container-stock--zero']}`}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </div>
            </div>
          }
        </div>
        <div className={`${classesBasket['basket__card-price--container']}`}>
          <div className={`${classes['product__card-price']} ${classesBasket['basket__card-price']}`}>
            {price ? `${displayPrice.toFixed(2)}$` : ''}
            {
              price ?
                <div className={`${classes['product__card-discount']}`}>
                  <div className={`${classes['product__card-price--old']}`}>{`${discountPercentage ? (displayPrice*100/(100-discountPercentage)).toFixed(2) : ''}$`}</div>
                </div> :
                ''
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;