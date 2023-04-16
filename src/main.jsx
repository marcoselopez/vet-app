import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { PublicRouter } from './Router';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import AppContext from './AppContext';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { CustomSuccessSnackbar } from './customComponents/CustomComponents';

const Main = () => {

  const [isLogged, setIsLogged] = useState(false);

  const setUsersInLocalStorage = () => {
    const users = [];
    if(!localStorage.getItem('users')){
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  useEffect(() => {
    setUsersInLocalStorage()
  }, [])

  useEffect(() => {
    const logged = JSON.parse(sessionStorage.getItem('loggedUser'));
    if(logged){
      setIsLogged(true)
    }
  }, [])

  return (
    <AppContext.Provider value={{setIsLogged}}>
      <SnackbarProvider
        maxSnack={2}
        transitionDuration={100}
        autoHideDuration={2000}
        Components={{
          success: CustomSuccessSnackbar
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        {
          !isLogged 
          ?
          <BrowserRouter>
            <PublicRouter />
          </BrowserRouter>
          :
          <App />
        }
      </SnackbarProvider>
    </AppContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />,
)
