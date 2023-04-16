import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import LoginForm from './LoginForm';
import { subtitleFormat, textFormat, titleFormat, waveAnimationFormat } from '../../customStyles/CustomStyles';
import { CustomButtonPrimary, CustomFlexedBox, CustomFullHeightFlexedBox } from '../../customComponents/CustomComponents';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

  const navigate = useNavigate();

  return (
    <Grid container height='100%' className='animate__animated animate__fadeIn'>

      <Grid className='animate__animated animate__fadeIn' item xs={7} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <Box>
          <Typography sx={titleFormat}>SIGN IN</Typography>
        </Box>
        <LoginForm />
      </Grid>

      <Grid item xs={5}>
        <CustomFullHeightFlexedBox sx={waveAnimationFormat}>
          <Typography className='animate__animated animate__fadeInDown' sx={{...titleFormat(), color: 'white'}}>Welcome Back!</Typography>
          <Typography className='animate__animated animate__fadeInDown' sx={{...subtitleFormat(), color: 'white'}}>Please log in to continue your journey with us!</Typography>

          <Box width='60%'>
            <Divider flexItem sx={{border: 'none', height: '2px', backgroundColor: 'white', margin: '1rem 0'}} />
          </Box>

          <CustomFlexedBox width='50%' className='animate__animated animate__fadeInUp'>
            <Typography sx={{...textFormat(), color: 'white'}}>If you don't have an account you can create one here!</Typography>
            <CustomButtonPrimary variant='outlined' sx={{ marginTop: '1rem'}} onClick={() => navigate('/register')}>
              <Typography>SIGN UP</Typography>
            </CustomButtonPrimary>
          </CustomFlexedBox>
        </CustomFullHeightFlexedBox> 
      </Grid>

    </Grid>
  )
};

export default LoginComponent;