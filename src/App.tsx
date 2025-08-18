import Header from "./components/Header/Header.tsx";
import Modal from "./components/Modal/Modal.tsx";
import {useState} from "react";

function App() {

  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <Header isActive={isActive} setIsActive={setIsActive}/>
      <Modal isActive={isActive} setIsActive={setIsActive}/>
    </div>
  )
}

export default App
