import React, {useState, useEffect} from 'react'
import {auth} from '../firebase'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)

    const signup = (email,password) => {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    const signin = (email,password) => {
        return auth.signInWithEmailAndPassword(email,password)
    }

    const signout = () => {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
          })
      
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        signin,
        signout,
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider