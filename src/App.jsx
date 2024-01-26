import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

const Signin = React.lazy(() => import("./components/Admin/Signin/Signin"))
const Queue = React.lazy(() =>import("./components/Admin/Queue/Queue"))
const Kiyosk = React.lazy(() => import("./components/Admin/Kiyosk/Kiyosk"))
const AdminAuth = React.lazy(() => import("./components/Admin/Middleware/AdminAuth"))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/queue" element={<AdminAuth><Queue/></AdminAuth>}/>
          <Route path="/kiyosk" element={<AdminAuth><Kiyosk/></AdminAuth>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App