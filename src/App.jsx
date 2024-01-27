import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";
import Autojoin from './components/Admin/Autojoin/Autojoin';

const Signin = React.lazy(() => import("./components/Admin/Signin/Signin"))
const Queue = React.lazy(() =>import("./components/Admin/Queue/Queue"))
const Kiyosk = React.lazy(() => import("./components/Admin/Kiyosk/Kiyosk"))
const AdminAuth = React.lazy(() => import("./components/Admin/Middleware/AdminAuth"))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/queue" element={<AdminAuth><Queue/></AdminAuth>}/>
          <Route path="/kiosk" element={<AdminAuth><Kiyosk/></AdminAuth>}/>
          <Route path="/autojoin" element={<AdminAuth><Autojoin/></AdminAuth>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App