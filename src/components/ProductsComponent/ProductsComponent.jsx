import { Grid, Box } from '@mui/material';
import Background from '../../assets/shopWaves.svg';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';


const ProductsComponent = () => {

  const [selectedCombo, setSelectedCombo] = useState('');
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate('/products/presentation', {replace: true})
  }, [])

  useEffect(() => {
    //If the user is admin, dont let him access
    if(sessionStorage.role === 'admin'){
      navigate('/home')
      enqueueSnackbar('Only clients can place orders', {variant: 'warning'})
    }
  }, [])

  return (
    <Grid container height='100%' className='animate__animated animate__fadeIn'>
      <Grid item xs={12}>
        <Box
          width='100%' 
          height='100%'
          sx={{
            background: `url(${Background})`, 
            backgroundRepeat: 'no-repeat', 
            backgroundPositionX: '-350px', 
            backgroundSize: '130%',
          }}>

          <Outlet 
            context={[
              selectedCombo,
              setSelectedCombo,
              pets,
              setPets,
              selectedPet,
              setSelectedPet
            ]}
          />

        </Box>
      </Grid>
    </Grid>
  )
};

export default ProductsComponent;