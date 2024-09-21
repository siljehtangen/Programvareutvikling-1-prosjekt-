"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { firebaseClient } from '@/lib/firebase'; // Assuming this is where you initialize Firebase
import { useRouter } from "next/navigation";

const AuthContext = createContext<{ 
    user: User | null, 
    isLoading: boolean, 
    signOut: () => void, 
}>({
    user: null,
    isLoading: true,
    signOut: () => {}
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const auth = getAuth(firebaseClient); // Get the auth instance

  function signOut() {
    firebaseSignOut(auth)
      .then(() => { router.push('/') })
      .catch((error) => {
        alert(error.message)
      });
  }

  /*function signUp(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }*/

  /*function signIn(email: string, password: string, path?: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log(authUser);
        router.push(path ? path : '/dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });
    console.log("signin", email, password);
  }*/

  /*function signInGoogle(path?: string) {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((authUser) => {
        console.log(authUser);
        router.push(path ? path : '/dashboard');
      })
      .catch((error) => {
        alert(error.message);
      });
  }*/

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { // listening for auth change
      if (!user) {
        setUser(null);
        setIsLoading(false);
      } else {
        setUser(user);
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
