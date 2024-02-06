import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth,provider} from '../firebaseConfig'
import {createUserWithEmailAndPassword,signInWithPopup} from 'firebase/auth'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(email, password);
    const navigate = useNavigate()



    const googleLogin = async (e) => {
        e.preventDefault()
        try {
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, provider);
            navigate("/")
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault()
       
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              navigate("/login")
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              // ..
          });
    }


    return (
        <div>
            <form className='form-control p-5 d-flex flex-column gap-3'>
                <h3> Register </h3>
                
                <input type="email" className='form-control' placeholder='enter the email' id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}  />

                <input type="password"  className="form-control" id="password" placeholder='Enter the password' name="password" onChange={(e)=>{setPassword(e.target.value)}} />

                <p>Already have an account <span><Link to={'/login'}>Login</Link></span></p>

                <button className='btn btn-dark '  onClick={onSubmit} >Register</button>
                <button className='btn btn-dark d-flex justify-content-center align-items-center gap-3 '  onClick={googleLogin} ><i class="fa-brands fa-google"></i>Google Login</button>
            </form>
        </div>
    )
}

export default Register