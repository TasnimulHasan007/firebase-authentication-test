import { useEffect, useState } from 'react'
import initializeAuthentication from '../Firebase/firebase.init'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

initializeAuthentication()

const useFirebase = () => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser({})
      }
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [auth])

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  const updateName = name => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        const newUser = { ...user, displayName: name }
        setUser(newUser)
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    signUp,
    login,
    logOut,
    updateName,
  }
}

export default useFirebase
