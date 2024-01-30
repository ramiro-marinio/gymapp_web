import { createContext,useState } from "react";
import React from 'react'
import { db,auth } from "./initialize_firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc,getFirestore } from "firebase/firestore";
export const FirebaseContext = createContext(undefined);


export default ({ children }) => {
  console.log('this shit has been executed.')
  const [user,setUser] = useState(undefined);
  onAuthStateChanged(auth,(user)=>{
    setUser(user);
  })
  return (
    <FirebaseContext.Provider value={{
        user:user,
        setUser:setUser,
    }}>{children}</FirebaseContext.Provider>
  )
}
