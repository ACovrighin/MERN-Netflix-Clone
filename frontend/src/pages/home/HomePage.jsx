import React from 'react'
import HomeScreen from './HomeScreen.jsx'
import AuthScreen from './authScreen.jsx'
import { useAuthStore } from '../../store/authUser.js'



const HomePage = () => {
  const {user} = useAuthStore();
  return (
    <>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </>
  )
}

export default HomePage