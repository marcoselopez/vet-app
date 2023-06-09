import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css';
import AppContext from './AppContext';
import { SnackbarProvider } from 'notistack';
import { CustomSuccessSnackbar } from './customComponents/CustomComponents';
import AppNavbar from './components/layout/AppNavbar';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import { BrowserRouter } from 'react-router-dom';

const Main = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const logged = JSON.parse(sessionStorage.getItem('loggedUser'));


  const setDataInLocalStorage = () => {
    // Set the first data in the localStorage to prepare an users array and a totalOrders array
    const users = [
      {
        email: "admin@admin.com",
        id: "id5574",
        orders: [],
        password: "123123",
        pets: [],
        role: "admin",
        user: "admin"
      }
    ];
    const totalOrders = [];
    if(!localStorage.getItem('users')){
      localStorage.setItem('users', JSON.stringify(users))
    }
    if(!localStorage.getItem('totalOrders')){
      localStorage.setItem('totalOrders', JSON.stringify(totalOrders))
    }
  }

  useEffect(() => {
    setDataInLocalStorage()
  }, [])

  useEffect(() => {    
    if(logged){
      setIsLogged(true)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [logged])

  useEffect(() => {
    // Check if the sessionStorage or localStorage has been tampered with for emulating the behavior of a DB when data is deleted or modified
    window.addEventListener('storage', () => {
      let isLoged = sessionStorage.loggedUser;
      if(isLoged === undefined){
        setIsLogged(false)
      }
      if(localStorage.users === undefined){
        sessionStorage.clear()
        localStorage.clear()
        setIsLogged(false)
      }
    });
    () => {
      window.removeEventListener('storage')
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
              <BrowserRouter>
                <AppNavbar />
                <PrivateRouter />
              </BrowserRouter>
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
