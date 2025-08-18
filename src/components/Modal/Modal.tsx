import MyButton from "../UI/MyButton/MyButton.tsx";
import MyInput from "../UI/MyInput/MyInput.tsx";
import classes from "./Modal.module.scss"

interface props {
  isActive: boolean
  setIsActive: (value: boolean) => void
}

const Modal = ({isActive, setIsActive}: props) => {
  return (
    <div className={`${classes.Overlay} ${isActive ? classes.Active : ''}`} onClick={() => setIsActive(!isActive)}>
      <div className={classes.MyModal} onClick={(event) => event.stopPropagation()}>
        <div className={classes.Form__header}>Войти или зарегестрироваться</div>
        <div className={classes.Buttons__container}>
          <MyButton className={classes.MyButton}>
            Войти
          </MyButton>
          <MyButton className={classes.MyButton}>
            Зарегистрироваться
          </MyButton>
        </div>
        <div className={classes.Input__container}>
          <MyInput className={classes.MyInput} placeholder='Введите email'/>
          <MyInput className={classes.MyInput} placeholder='Введите пароль'/>
        </div>
      </div>
    </div>

  );
};

export default Modal;