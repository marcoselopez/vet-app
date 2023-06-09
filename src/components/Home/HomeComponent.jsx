import { Box, Grid, Typography } from '@mui/material';
import Waves from '../../assets/wave.svg';
import Dog from '../../assets/doggo3.svg';
import { subtitleFormat, textFormat, titleFormat } from '../../customStyles/CustomStyles';
import { CustomButtonPrimary, CustomButtonPrimaryFilled, CustomButtonSecondary, CustomButtonSecondaryOutlined } from '../../customComponents/CustomComponents';
import { useNavigate } from 'react-router-dom';
import { CustomFlexedBox } from '../../customComponents/CustomComponents';

const HomeComponent = () => {

  const navigate = useNavigate();

  return (
    <Grid container height='100%' className='animate__animated animate__fadeIn'>
      <Grid item xs={12}>
        <Box 
          width='100%' 
          height='100%'
          sx={{
            background: `url(${Waves})`, 
            backgroundRepeat: 'no-repeat', 
            backgroundPositionY: '-100px', 
            backgroundSize: '160%',
            backgroundAttachment: 'fixed'
          }}>
            <Grid container height='100%'>
              <Grid item xs={6} display='flex' alignItems='center' justifyContent='center' position='relative'>
                <img className='animate__animated animate__fadeInUp' src={Dog} alt="dog-beach" width='400px' />
                <Box width='50%' position='absolute' top='50px' left='50px' className='animate__animated animate__zoomInDown'>
                  <Typography 
                    sx={{...titleFormat(), color: 'white', fontSize: '3rem'}}
                  >
                    BEST FLAVOR
                  </Typography>
                  <Typography 
                    sx={{...subtitleFormat(), color: 'white', fontWeight: '500'}}
                  >
                    Treat your furry friends with our healthy and delicious meal packages so you can enjoy a long life with your partner.
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={3} display='flex' alignItems='center' justifyContent='center' position='relative'>
                <Box width='100%' position='absolute' bottom='250px' right='25px' className='animate__animated animate__zoomInUp' textAlign='right'>
                  <Typography 
                    sx={{...titleFormat(), fontSize: '3rem'}}
                  >
                    BEST QUALITY
                  </Typography>
                  <Typography 
                    sx={{...subtitleFormat(), color: '#38AA95', fontWeight: '500', marginBottom: '20px'}}
                  >
                    Our premium food packages are made with the finest ingredients and designed to nourish and satisfy even the most discerning pets.
                  </Typography>
                </Box>
                <CustomFlexedBox width='100%' position='absolute' bottom='100px' right='35px' className='animate__animated animate__fadeInRight' textAlign='right'>
                  <Typography sx={{...textFormat(), color: '#38AA95', fontWeight: '400', fontSize: '13px', marginBottom: '1rem'}}>Register your pets and start enjoying our combos, or go directly to shop!</Typography>
                  <CustomButtonSecondary onClick={() => navigate('/register-pets')}>
                    <Typography>REGISTER PETS</Typography>
                  </CustomButtonSecondary>
                </CustomFlexedBox>
              </Grid>

              <Grid item xs={3} display='flex' alignItems='center' justifyContent='center' position='relative'>
                <CustomFlexedBox width='100%' position='absolute' bottom='100px' right='35px' className='animate__animated animate__fadeInRight' textAlign='right'>
                  <Typography sx={{...textFormat(), color: '#38AA95', fontWeight: '400', fontSize: '13px', marginBottom: '1rem'}}>Or you can go directly to the shop!</Typography>
                  <CustomButtonSecondary fullWidth onClick={() => navigate('/products/presentation')}>
                    <Typography>START ORDERING</Typography>
                  </CustomButtonSecondary>
                </CustomFlexedBox>
              </Grid>
            </Grid>
        </Box>
      </Grid>
    </Grid>
  )
};

export default HomeComponent;