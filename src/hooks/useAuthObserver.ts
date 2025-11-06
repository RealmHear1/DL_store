import {useAppDispatch} from "./redux.ts";
import { authSlice } from "../store/reducers/authSlice.ts";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

export const useAuthObserver = () => {
  const dispatch = useAppDispatch()
  const { setUser } = authSlice.actions

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          email: user.email ?? null,
          displayName: user.displayName ?? null,
          uid: user.uid ?? null,
          photoURL: user.photoURL ?? null,
        }));
      } else {
        dispatch(setUser(null));
      }
    })
    return () => unsubscribe();
  }, [dispatch])
}