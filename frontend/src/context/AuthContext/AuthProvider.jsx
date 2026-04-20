import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../AuthContext/AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // users v2
  const [dbUser, setDbUser] = useState(null);

  // google provide instance
  const providerGoogle = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, providerGoogle);
  };

  // v1
  // useEffect( () => {
  //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //         setUser(currentUser)
  //         setLoading(false)
  //         console.log('User in the auth state change: ')
  //     })
  //     return () => {
  //         unsubscribe()
  //     }
  // } , [])

  // v2
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const res = await fetch(
            `http://localhost:1272/users/${currentUser.email}`,
          );
          //   const data = await res.json();
          if (res.ok) {
            const data = await res.json();
            setDbUser(data);
          } else if (res.status === 404) {
            setDbUser(null); // user not in Mongo yet, not a real error
          } else {
            console.log("Failed to fetch DB user");
            setDbUser(null);
          }

        //   setDbUser(data);
        } catch (error) {
          console.log("Failed to fetch DB user:", error);
          setDbUser(null);
        }
      } else {
        setDbUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
    setDbUser(null);
  };

  const authInfo = {
    loading,
    createUser,
    signIn,
    user,
    dbUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
