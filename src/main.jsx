import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css';
import AppContext from './AppContext';
import { SnackbarProvider } from 'notistack';
import { CustomSuccessSnackbar } from './customComponents/CustomComponents';
import AppNavbar from './components/layout/AppNavbar';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';

const Main = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

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
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <>
      {
        loading ?
        <div>Loading...</div>
        :
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
              <PublicRouter />          
              :
              <>
                <AppNavbar />
                <PrivateRouter />
              </>
            }
          </SnackbarProvider>
        </AppContext.Provider>
      }
    </>
  )
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />,
);
