import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../../../firebase/initialize_firebase";
import { UserData } from "../../../../../auth/models/userdata";

function getAllUsers(gymId){
    getDocs(
        query(
            collection(
                db,
                'memberships'
            ),
        where('gymId','==',gymId)
        )
    ).then((querySnapshot)=>{
        let result = [];
        for(var i=0;i<querySnapshot.docs.length;i++){
            getDoc(doc(db,'userData',querySnapshot.docs[i].data().userId)).then((queryDocumentSnapshot)=>{
                 result.push(UserData.fromJson(querySnapshot.data()));
            })
        }
    })
}