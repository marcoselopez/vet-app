import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react'
import { CustomButtonPrimary, CustomFlexedBox, CustomFullHeightFlexedBox } from '../../customComponents/CustomComponents';
import RegisterForm from './RegisterForm';
import { subtitleFormat, textFormat, titleFormat, waveAnimationFormat } from '../../customStyles/CustomStyles';
import { useNavigate } from 'react-router-dom';

const RegisterComponent = () => {

  const navigate = useNavigate();

  return (
    <Grid container height='100%' className='animate__animated animate__fadeIn'>

      <Grid item xs={5}>
        <CustomFullHeightFlexedBox sx={waveAnimationFormat}>
          <Typography className='animate__animated animate__fadeInDown' sx={{...titleFormat(), color: 'white'}}>Hello there!</Typography>
          <Typography className='animate__animated animate__fadeInDown' sx={{...subtitleFormat(), color: 'white'}}>Please fill the information to create your account</Typography>

          <Box width='60%'>
            <Divider flexItem sx={{border: 'none', height: '2px', backgroundColor: 'white', margin: '1rem 0'}} />
          </Box>

          <CustomFlexedBox width='50%' className='animate__animated animate__fadeInUp'>
            <Typography sx={{...textFormat(), color: 'white'}}>If you already own an account you can access from here!</Typography>
            <CustomButtonPrimary variant='outlined' sx={{ marginTop: '1rem'}} onClick={() => navigate('/login')}>
              <Typography>SIGN IN</Typography>
            </CustomButtonPrimary>
          </CustomFlexedBox>
        </CustomFullHeightFlexedBox> 
      </Grid>

      <Grid item xs={7} display='flex' flexDirection='column' justifyContent='center' alignItems='center' className='animate__animated animate__fadeIn'>
        <Box>
          <Typography sx={titleFormat}>SIGN UP</Typography>
        </Box>
        <RegisterForm />
      </Grid>

    </Grid>
  )
};

export default RegisterComponent;