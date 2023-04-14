import { Box, Grid } from '@mui/material'
import React from 'react'
import LoginForm from './LoginForm';
import Image from '../../assets/login2.jpg';

const LoginComponent = () => {
  return (
    <Grid container height='100%'>

      <Grid item xs={5}>
        <LoginForm />
      </Grid>

      <Grid item xs={7}>
        <img 
          src={Image} 
          alt="background" 
          width='100%' 
          height='100%' 
          style={{ 
            objectFit: 'cover',
            filter: 'brightness(80%)'
          }}
        />      
      </Grid>

    </Grid>
  )
};

export default LoginComponent;