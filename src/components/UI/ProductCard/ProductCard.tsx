import  classes from "./ProductCard.module.scss"
import MyButton from "../MyButton/MyButton.tsx";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux.ts";
import {productSlice} from "../../../store/reducers/productSlice.ts";

const ProductCard = () => {





  return (
    <div className={classes.productCard}>
      <MyButton>Фетч</MyButton>
    </div>
  );
};

export default ProductCard;