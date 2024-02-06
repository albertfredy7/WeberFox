import React, { useEffect, useState } from 'react'
import {auth} from '../firebaseConfig'
import { onAuthStateChanged,signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
function Home() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
            navigate('/login')
        }).catch((error) => {
        // An error happened.
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              const email = user.email;
              const photo = user.photoURL;
              setPhoto(photo)

              console.log(email);
              setEmail(email)
              // ...
              console.log("uid", uid)
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])
  return (
    <>
        <div className='card p-5 d-flex gap-3'>
        <img  className="rounded-circle" src={photo} alt="" />
            <h3>{email}</h3>
            <button onClick={handleLogout}>Signout</button>
            
        </div>
    </>
  )
}

export default Home