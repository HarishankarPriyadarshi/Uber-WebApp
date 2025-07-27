import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import Home from './pages/Home.jsx'
import UserProtectWrapper from './pages/UserProtectWrapper.jsx'
import UserLogout from './pages/UserLogout.jsx'
import CaptainHome from './pages/CaptainHome.jsx'
import CaptainProtectWraper from './pages/CaptainProtectWraper.jsx'
import CaptainLogout from './pages/CaptainLogout.jsx'
import Riding from './pages/Riding.jsx'
import CaptainRiding from './pages/CaptainRiding.jsx'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />

        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        <Route path='/captain-home' element={
          <CaptainProtectWraper>
            <CaptainHome />
          </CaptainProtectWraper>
        } />
        {/* <Route path='/captain/logout' element={
          <CaptainProtectWraper>
            <CaptainLogout />
          </CaptainProtectWraper>
        } /> */}
        <Route path='/captain/logout' element={<CaptainLogout />} />

      </Routes>
    </>
  )
}

export default App
