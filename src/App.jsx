import { BrowserRouter } from 'react-router-dom';
import {Router} from './Router';
import AppNavbar from './components/layout/AppNavbar';

function App() {

  return (
    <>
      <AppNavbar />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
};

export default App;
