import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import App from './App'
import AuthProvider from './contexts/auth-context'
import { CartProvider } from './contexts/cart-context'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
