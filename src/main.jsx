import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PublicRouter } from './Router';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

const Main = () => {
  const isLogged = false;
  return (
    <>
      {
        !isLogged 
          ?
          <BrowserRouter>
            <PublicRouter />
          </BrowserRouter>
          :
          <App />
      }
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />,
)
