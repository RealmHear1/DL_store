import Header from "./components/Header/Header.tsx";
import Modal from "./components/Modal/Modal.tsx";
import { useAuthObserver } from "./hooks/useAuthObserver.ts";
import AppRouter from "./components/AppRouter.tsx";

function App() {
  useAuthObserver();

  return (
    <div>
      <Header/>
      <Modal/>
      <AppRouter/>
    </div>
  )
}

export default App
