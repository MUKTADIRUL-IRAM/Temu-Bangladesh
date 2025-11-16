import { AuthContext } from "../Auth/AuthContext";
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged,sendEmailVerification,signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import app from "../firebase/firebase_init";
import { useEffect, useState } from "react";
import axios from "axios";

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState();
    const [loading,setloading] = useState(true);

    const provider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();

    const createUser = (email,password)=>{
        setloading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    };

    const signInUser = (email,password)=>{
        setloading(true);
        return signInWithEmailAndPassword(auth,email,password);
    };

    const signUserOut = ()=>{
        return signOut(auth);
    };

    const updateUserProfile = (updatedData)=>{
        return updateProfile(auth.currentUser,updatedData);
    };

    const signInWithGoogle = ()=>{
        setloading(true);
        return signInWithPopup(auth,provider);
    };

    const signInWithFacebook = ()=>{
        setloading(true);
        return signInWithPopup(auth,fbProvider);
    };

    const emailVerification = async()=>{
        console.log("Current user at verification:", auth.currentUser);
        const user = auth.currentUser;
       if(user) 
        {
           const actionCodeSettings = {
           url: "http://localhost:5173",
           handleCodeInApp: true,
        };
           return sendEmailVerification(user, actionCodeSettings);
        } 
       else {
         console.error("No current user found for verification");
       }
    }

    useEffect(()=>{

        const unsubscribed = onAuthStateChanged(auth,(currentUser)=>{

              setUser(currentUser);
              console.log('Currently Logged in : ',currentUser);

              if(currentUser?.email)
              {
                const userEmail = {email : currentUser.email};//req.body = {email : currentUser.email}
                axios.post('https://temu-bangladesh-server.vercel.app/jwt',userEmail,{withCredentials:true})
                .then(res=>{
                    console.log('Login Token : ',res.data);
                    setloading(false);
                })
                .catch((error)=>{
                    const errorMesssage = error.message;
                    console.log("Error in token : ",errorMesssage);
                    
                })
              }

              else{
                axios.post('https://temu-bangladesh-server.vercel.app/logout',{},{withCredentials:true})
                .then(res=>{
                    console.log("Log out : ",res.data);
                    setloading(false);
                    
                })
              }
              
              
            })

            return()=>{
               unsubscribed();
            }

    },[]);

    const authInfo = {user,loading,createUser,signInUser,signUserOut,updateUserProfile,signInWithGoogle,signInWithFacebook,emailVerification};


    return (
        <div>
           <AuthContext.Provider value={authInfo}>
             {children}
           </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;