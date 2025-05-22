import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AccountProvider } from './context/Account.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AccountProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AccountProvider>
  </BrowserRouter >,
)
