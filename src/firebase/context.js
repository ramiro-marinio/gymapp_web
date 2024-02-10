import { createContext,useState } from "react";
import React from 'react'
import { db,auth } from "./initialize_firebase";
import { onAuthStateChanged} from "firebase/auth";
import { getDoc,doc, setDoc, onSnapshot, updateDoc, collection, where, query } from "firebase/firestore";
import { UserData } from "../components/auth/models/userdata";
import { GymData } from "../components/pages/my-gyms/models/gymdata";
export const FirebaseContext = createContext(undefined);
let unsubUserData;
let unsubGyms;
export default ({ children }) => {
  const [user,setUser] = useState(undefined);
  const [userData,setUserData] = useState(undefined);
  const[gyms,setGyms] = useState(undefined);
  onAuthStateChanged(auth,(user)=>{
    setUser(user);
  })
  if(user){
    getDoc(doc(db,'userData',user.uid)).then((documentSnapshot)=>{
      if(!documentSnapshot.data()){
        setDoc(doc(db,'userData',user.uid),new UserData(Date.now(),'New User','At The Gym.','', user.photoURL,true,false,175,user.uid,70).toJson())
      }
    })
    if(!unsubUserData){
      unsubUserData = onSnapshot(doc(db,'/userData',user.uid),(snapshot)=>{
        setUserData(UserData.fromJson(snapshot.data()));
      });
    }
    if(!unsubGyms){
      const q = query(collection(db,'memberships'),where("userId","==",user.uid))
      unsubGyms = onSnapshot(q,async(documentSnapshot)=>{
        let result = Array(0);
        for(let i=0;i<documentSnapshot.docs.length;i++){
          const data = (await getDoc(doc(db,'gyms',documentSnapshot.docs[i].data().gymId))).data();
          result.push(GymData.fromJson(data));
        }
        setGyms(result);
      })
    }
  }
  else if(!user){
    if(unsubUserData){
      unsubUserData();
      setUserData(null);
    }
    unsubUserData = undefined;
    if(unsubGyms){
      unsubGyms();
    }
    unsubGyms = undefined;
  }
  return (
    <FirebaseContext.Provider value={{
        user:user,
        setUser:setUser,
        userData:userData,
        setUserData:async(json)=>{
          return await updateDoc(doc(db,'/userData',user.uid),json)
        },
        gyms:gyms,
    }}>{children}</FirebaseContext.Provider>
  )
}
