import Header from "./components/Header/Header.tsx";
import Modal from "./components/Modal/Modal.tsx";
import { useAuthObserver } from "./hooks/useAuthObserver.ts";
import ProductCard from "./components/UI/ProductCard/ProductCard.tsx";

function App() {
  useAuthObserver();

  return (
    <div>
      <Header/>
      <Modal/>
      <ProductCard/>
    </div>
  )
}

export default App
