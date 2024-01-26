import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import store from './components/Redux/Store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId='508224318018-quta6u0n38vml0up7snscdrtl64555l1.apps.googleusercontent.com'>
    <Provider store={store}>
      <App />
      </Provider>
    </GoogleOAuthProvider>
  // </React.StrictMode>,
)
