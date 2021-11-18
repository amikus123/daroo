import { User, signInWithPopup, signOut } from "firebase/auth";

import { createContext, useState, useEffect } from "react";
import { login, setPersistanceToNone, signout } from "../firebase/auth";
import { googleProvider, myAuth } from "../firebase/main";

const a: any = null;
export const UserContext = createContext({
  login: async () => {
    const a: any = "";
    return a;
  },
  signout: async () => {
    const a: any = "";
    return a;
  },
  currentUser: a,
});

export const UserProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // check if user i present
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const init = async () => {
      await setPersistanceToNone();
    };
    init()
  },[])
  
  useEffect(() => {

    const unsubscribe = myAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log(user, "context user");
    });
    return unsubscribe;
  }, []);

  const val = { currentUser, login, signout };
  return (
    <UserContext.Provider value={{ ...val }}>
      {loading ? null : <>{children}</>}
    </UserContext.Provider>
  );
};
