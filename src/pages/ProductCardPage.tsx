import {useParams} from "react-router-dom";

const ProductCardPage = () => {

  const {id} = useParams()

  return (
    <div>
      {id}
    </div>
  );
};

export default ProductCardPage;