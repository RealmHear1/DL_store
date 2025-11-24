import {useNavigate, useParams} from "react-router-dom";
import classes from "./ProductCardPage.module.scss"
import Loader from "../../components/UI/Loader/Loader.tsx";
import {useProductDetails} from "../../hooks/useProductDetails.ts";
import MyButton from "../../components/UI/MyButton/MyButton.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {productSlice} from "../../store/reducers/productSlice.ts";

const ProductCardPage = () => {

  const {favorites} = useAppSelector(state => state.productReducer)
  const dispatch = useAppDispatch()
  const {toggleFavorite} = productSlice.actions
  const {id} = useParams()
  const {product, isLoading, error} = useProductDetails(id)
  const navigate = useNavigate()
  const isFavourite = favorites.includes(Number(id))

  if (isLoading || !product) {
    return <div className={classes.loader__container}><Loader className={classes.loader__modify}/></div>;
  }
  if (error) return <div style={{color: "red"}}>{error}</div>

  const {stock, thumbnail, discountPercentage, brand, rating, title, price, category, description, images, reviews, tags, shippingInformation} = product

  return (
    <div className={`${classes['product__details-container']}`}>
      <div className={`${classes.catalog__navigation}`}>
        <div className={classes.navigation__centre}>
          <MyButton onClick={() => navigate(-1)} className={`${classes['arrow__left-container']}`}>
            <svg className={classes.arrow__left} width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L6.41421 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H6.41421L11.7071 18.2929C12.0976 18.6834 12.0976 19.3166 11.7071 19.7071C11.3166 20.0976 10.6834 20.0976 10.2929 19.7071L3.29289 12.7071C3.10536 12.5196 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929L10.2929 4.29289C10.6834 3.90237 11.3166 3.90237 11.7071 4.29289Z" fill="currentColor"></path> </g></svg>
          </MyButton>
          <div>
            <div className={classes.navigation__centre}>
              <MyButton onClick={() => navigate('/')} className={`${classes['catalog__navigation-text']} ${classes['catalog__navigation-text--info']}`}>
                Главная
              </MyButton>
              {category ? <p className={`${classes['catalog__navigation-text']} ${classes['catalog__navigation-text--slashes']}`}>/</p> : ''}
              <MyButton className={`${classes['catalog__navigation-text']} ${classes['catalog__navigation-text--info']}`}>
                {category}
              </MyButton>
              {brand ? <p className={`${classes['catalog__navigation-text']} ${classes['catalog__navigation-text--slashes']}`}>/</p> : ''}
              <MyButton className={`${classes['catalog__navigation-text']} ${classes['catalog__navigation-text--info']}`}>
                {brand}
              </MyButton>
            </div>
          </div>
        </div>
        <div className={`${classes['catalog__navigation-buttons--container']} ${classes.navigation__centre}`}>
          <MyButton onClick={() => dispatch(toggleFavorite(Number(id)))} className={`${classes['catalog__navigation-buttons']} ${isFavourite ? classes['favourite__button--clicked'] : ''} ${classes.navigation__centre}`}>
            <svg width='30px' height='30px' viewBox="0 0 24 24" fill="#FFF" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
          </MyButton>
          <MyButton className={`${classes['catalog__navigation-buttons']} ${classes.navigation__centre}`}>
            <svg width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="text-edit" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><g id="insert-link" fill="currentColor" fillRule="nonzero"><path d="M11,9 L7,9 C5.34314575,9 4,10.3431458 4,12 C4,13.6568542 5.34314575,15 7,15 L11,15 L11,17 L7,17 C4.23857625,17 2,14.7614237 2,12 C2,9.23857625 4.23857625,7 7,7 L11,7 L11,9 Z M13,15 L17,15 C18.6568542,15 20,13.6568542 20,12 C20,10.3431458 18.6568542,9 17,9 L13,9 L13,7 L17,7 C19.7614237,7 22,9.23857625 22,12 C22,14.7614237 19.7614237,17 17,17 L13,17 L13,15 Z M9,11 L15,11 C15.5522847,11 16,11.4477153 16,12 C16,12.5522847 15.5522847,13 15,13 L9,13 C8.44771525,13 8,12.5522847 8,12 C8,11.4477153 8.44771525,11 9,11 Z" id="Shape"></path></g></g></svg>
          </MyButton>
        </div>
      </div>
      <MyButton >
        <img alt='На фотосессии' src={`${thumbnail}`} className={`${classes['product__card-image']}`}/>
      </MyButton>
    </div>
  );
};

export default ProductCardPage;