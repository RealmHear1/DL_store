import Header from "./components/Header/Header.tsx";
import Modal from "./components/Modal/Modal.tsx";
import { useAuthObserver } from "./hooks/useAuthObserver.ts";
import ProductCards from "./components/ProductCards/ProductCards.tsx";

function App() {
  useAuthObserver();

  return (
    <div className='background__color'>
      <Header/>
      <Modal/>
      <ProductCards/>
    </div>
  )
}

export default App
