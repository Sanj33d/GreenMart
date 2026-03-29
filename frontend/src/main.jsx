import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './components/Router.jsx'
import AuthProvider from './context/AuthContext/AuthProvider.jsx'
import CartProvider from './context/CartContext/CartProvider.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </CartProvider>
  </StrictMode>,
)
