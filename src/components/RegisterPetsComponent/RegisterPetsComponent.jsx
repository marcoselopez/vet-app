import { Box, Grid, Typography } from '@mui/material';
import Background from '../../assets/fullWaves2.svg';
import Pet from '../../assets/pets.svg';
import { titleFormat} from '../../customStyles/CustomStyles';
import StepperComponent from './StepperComponent';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

const RegisterPetsComponent = () => {

  const navigate = useNavigate();

  useEffect(() => {
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

            <Grid container height='100%'>
              <Grid item xs={5}  display='flex' alignItems='center' justifyContent='center'>
                <img className='animate__animated animate__fadeInUp' src={Pet} alt="dog-beach" width='400px' />
              </Grid>

              <Grid item xs={7} display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
                <Box width='100%' marginTop='50px' textAlign='center'>
                  <Typography sx={{...titleFormat(), marginBottom: '50px', color: 'white'}}>
                    To start ordering our products you need to register your pet first, let's guide you through.
                  </Typography>
                </Box>
                <StepperComponent />
              </Grid>
            </Grid>

        </Box>
      </Grid>
    </Grid>
  )
}

export default RegisterPetsComponent