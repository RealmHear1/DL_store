import MyButton from "../UI/MyButton/MyButton.tsx";
import MyInput from "../UI/MyInput/MyInput.tsx";
import classes from "./Modal.module.scss"
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {modalSlice} from "../../store/reducers/modalSlice.ts";
import {
  loginWithEmail,
  loginWithGoogle,
  registerWithEmail,
} from "../../services/authService.ts";
import {authSlice} from "../../store/reducers/authSlice.ts";
import {useState} from "react";
import Loader from "../UI/Loader/Loader.tsx";

const Modal = () => {

  const {isLoading, error} = useAppSelector(state => state.authReducer)
  const {isActive} = useAppSelector(state => state.modalReducer)
  const dispatch = useAppDispatch()
  const {changeModalState} = modalSlice.actions
  const {setUser, setLoading, setError} = authSlice.actions
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [login, setLogin] = useState<boolean>(true)

  const changeState = () => {
    dispatch(setError(null))
    dispatch(changeModalState())
  }

  const loginInGoogle = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))
      const result = await loginWithGoogle()
      const user = result.user;
      dispatch(setUser({
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        uid: user.uid ?? null,
        photoURL: user.photoURL ?? null,
      }));
      dispatch(changeModalState())
    } catch (e: any) {
      dispatch(setError(e.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const registerEmail = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))
      const result = await registerWithEmail(mail, password)
      const user = result.user;
      dispatch(setUser({
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        uid: user.uid ?? null,
        photoURL: user.photoURL ?? null,
      }));
    } catch (e: any) {
      dispatch(setError(e.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  const loginEmail = async () => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))
      const result = await loginWithEmail(mail, password)
      const user = result.user;
      dispatch(setUser({
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        uid: user.uid ?? null,
        photoURL: user.photoURL ?? null,
      }));
      dispatch(changeModalState())
    } catch (e: any) {
      dispatch(setError(e.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={`${classes.Overlay} ${isActive ? classes.Active : ''}`} onClick={changeState}>
      <div className={classes.MyModal} onClick={(event) => event.stopPropagation()}>
        <div className={classes.form__header}>Вход в аккаунт</div>
        <div>
          <div className={`${classes.buttons__container}`}>
            <MyButton onClick={() => { dispatch(setError(null)); setLogin(true); }} className={`${classes.MyButton} ${login ? classes.buttons__selected : ''}`}>Войти</MyButton>
            <MyButton onClick={() => { dispatch(setError(null)); setLogin(false); }} className={`${classes.MyButton} ${!login ? classes.buttons__selected : ''}`}>Зарегистрироваться</MyButton>
          </div>
          <div className={classes.login__container}>
            <MyInput onChange={(e) => setMail(e.target.value)} value={mail} className={classes.MyInput} placeholder={'Электронная почта'}></MyInput>
            <MyInput type={'password'} onChange={(e) => setPassword(e.target.value)} value={password} className={classes.MyInput} placeholder={'Пароль'}></MyInput>
          </div>
        </div>
        {login ?
          <div>
            <MyButton className={classes.auth__button} onClick={loginEmail}>
              {isLoading
                ? <Loader className={classes.loader}/>
                : <div>Войти</div>
              }
            </MyButton>
          </div>
          :
          <div>
            <MyButton className={classes.auth__button} onClick={registerEmail}>
              {isLoading
                ? <Loader className={classes.loader}/>
                : <div>Зарегистрироваться</div>
              }
            </MyButton>
          </div>
        }
        {error && (
          <div className={classes.error__container}>
            <div className={classes.error__message}>{error}</div>
          </div>
        )}
        <div className={classes.input__container}>
        </div>
        <div className={`${classes.buttons__container} ${classes.login__container}`}>
          <MyButton className={`${classes.auth__button} ${classes['auth__button--services']}`} onClick={loginInGoogle}>
            Вход с Google
            <svg width="30px" height="30px" viewBox="0 0 256 262" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid"><g><path d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451" fill="#4285F4"/><path d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1" fill="#34A853"/><path d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37" fill="#FBBC05"/><path d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479" fill="#EB4335"/></g></svg>
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;