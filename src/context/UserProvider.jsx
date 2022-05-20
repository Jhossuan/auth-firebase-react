import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [ user, setUser ] = useState(false)
    const [ active, setActive ] = useState(false)

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user)=> {
            console.log(user)
            if(user){
              const {displayName, email, photoURL, uid} = user;
              setUser({displayName, email, photoURL, uid})
            }else{
              setUser(null)
            }
        })
        return ()=>unsubscribe()
    },[])

    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)

  return (
    <UserContext.Provider value={{user, setUser, active, setActive, loginUser, registerUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
