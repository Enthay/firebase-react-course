import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

export const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(auth?.currentUser?.photoURl)
  
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      console.error(err)
    }
  }

  const signGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err)
    }
  } 

  const logOut = async () => {
    try {
      await signOut(auth)
      console.log('user logged out')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1>sign in with email</h1>
        <input
         type="email"
         placeholder="email..."
         onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
         type="password"
         placeholder="password..."
         onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>sign in</button>
    
        <button onClick={signGoogle}>sign in with google</button>
        <button onClick={logOut}>logout</button>
    </div>
  )
}
