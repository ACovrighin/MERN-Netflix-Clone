import React from 'react'
import HomeScreen from './HomeScreen.jsx'
import AuthScreen from './authScreen.jsx'


const HomePage = () => {
  const user = false;
  return (
    <div>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </div>
  )
}

export default HomePage