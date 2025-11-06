import Header from "./components/Header/Header.tsx";
import Modal from "./components/Modal/Modal.tsx";
import { useAuthObserver } from "./hooks/useAuthObserver.ts";

function App() {
  useAuthObserver();

  return (
    <div>
      <Header />
      <Modal />
    </div>
  )
}

export default App
