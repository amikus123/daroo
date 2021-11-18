import {
  signInWithPopup,
  signOut,
  setPersistence,
  inMemoryPersistence,
} from "firebase/auth";
import { googleProvider, myAuth } from "./main";

export const setPersistanceToNone = async () => {
  try {
    await setPersistence(myAuth, inMemoryPersistence);
    console.log("SET");
  } catch (e) {
    console.error("FUCK", e);
  }
};
export const init = async () => {
  await setPersistanceToNone();
};

export const login = async () => {
  try {
    return await signInWithPopup(myAuth, googleProvider);
  } catch (e) {
    alert("failed to login");
  }
};

export const signout = async () => {
  try {
    return await signOut(myAuth);
  } catch (e) {
    alert("failed to signout");
  }
};
