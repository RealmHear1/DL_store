import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.tsx";
import OrdersPage from "../pages/OrdersPage.tsx";
import FavouritesPage from "../pages/FavouritesPage/FavouritesPage.tsx";
import BasketPage from "../pages/BasketPage/BasketPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
import ProductCardPage from "../pages/ProductCardPage.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/orders' element={<OrdersPage/>} />
      <Route path='/favourites' element={<FavouritesPage/>} />
      <Route path='/basket' element={<BasketPage/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/catalog/:id' element={<ProductCardPage/>} />
      <Route path='*' element={<HomePage/>} />
    </Routes>
  );
};

export default AppRouter;