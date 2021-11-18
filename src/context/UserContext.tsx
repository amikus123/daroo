import { User } from "firebase/auth";

import { createContext, useState, useEffect } from "react";
import { authorizedEmails } from "../const/types";
import { login, setPersistanceToNone, signout } from "../firebase/auth";
import {  myAuth } from "../firebase/main";


export const UserContext = createContext(null);

export const UserProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // check if user i present
  const [loading, setLoading] = useState(true);
  const [canUserEdit, setCanUserEdit] = useState(false);

  useEffect(() => {
    const init = async () => {
      await setPersistanceToNone();
    };
    init();
  }, []);

  useEffect(() => {
    const unsubscribe = myAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user && authorizedEmails.indexOf(user.email) !== -1) {
        setCanUserEdit(true);
      } else {
        setCanUserEdit(false);
      }
      console.log(user, "context user");
    });
    return unsubscribe;
  }, []);

  const val = { currentUser, login, signout, canUserEdit };
  return (
    <UserContext.Provider value={{ ...val }}>
      {loading ? null : <>{children}</>}
    </UserContext.Provider>
  );
};
