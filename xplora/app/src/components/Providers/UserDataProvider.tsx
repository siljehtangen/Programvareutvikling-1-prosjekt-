"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { firebaseClient } from '@/lib/firebase'; // Assuming this is where you initialize Firebase
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { ObjectId } from "mongodb";

export interface UserData {
  _id: string,
  role: "admin" | "user"
  pinnedDestinations?: string[]
  favoriteDestinations?: string[]
}

const UserContext = createContext<{ 
    userAuth: User | null, 
    userData: UserData | null,
    isLoading: boolean, 
    authIsLoading: boolean,
    setUserData: (newUser: UserData | null) => void,
}>({
    userAuth: null,
    userData: null,
    isLoading: false,
    authIsLoading: false,
    setUserData: () => {}
});

export default function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const authContext = useAuth()

  useEffect(() => {  
    async function fetchData() {
      if (authContext.user?.uid) {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/user?uid=${authContext.user.uid}`);
          if (!response.ok) {
            throw new Error('No existing user found');
          }
          const data = await response.json() as unknown as UserData;
            console.log("user data", data)
            setUserData(data);
            setIsLoading(false); 
          
        } catch (error) {
          console.error("Error fetching user data:", error);
          console.log("Creating new user...")
          const data = await createUser(authContext.user?.uid)
            if (data) setUserData(data)
            setIsLoading(false);         
        }
      } else {
          setIsLoading(false); 
      }
    }

    async function createUser(uid: string) {
      try {
        const response = await fetch('/api/user', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: uid }) 
        });
        if (!response.ok) {
          throw new Error('No existing user found');
        }
        const data = await response.json() as unknown as UserData;

        console.log('User created successfully', data);

        return data
      } catch (error) {
        console.error('Failed to create user:', error);
        return null
      }
    }

  
    if (authContext.user?.uid) {
      fetchData();
    }
    else {
      setUserData(null)
    }
  
  }, [authContext.user?.uid]);

  return (
    <UserContext.Provider value={{ userAuth: authContext.user, userData, isLoading, authIsLoading: authContext.isLoading, setUserData }}>{children}</UserContext.Provider>
  );
}

export const useUserData = () => {
  return useContext(UserContext);
};
