import {createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {auth} from "../firebase";

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  return await signInWithPopup(auth, provider)
}

export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

/*
export const setupRecaptcha = (containerId: string) => {
  if (!(window as any).recaptchaVerifier) {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      containerId,
      {
        size: "invisible",
        callback: (response: any) => {
          console.log("reCAPTCHA resolved:", response);
        },
      }
    );
  }
};

export const loginWithPhone = async (phoneNumber: string) => {
  const appVerifier = (window as any).recaptchaVerifier;
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  (window as any).confirmationResult = confirmationResult;
  return confirmationResult;
};

export const verifyPhoneCode = async (code: string) => {
  const result = await (window as any).confirmationResult.confirm(code);
  return result.user;
};
 */

export const logout = async () => {
  return await auth.signOut()
}


