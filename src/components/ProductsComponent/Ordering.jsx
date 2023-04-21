import { Box, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { CustomButtonPrimaryFilled, CustomCard, CustomFlexedBox } from '../../customComponents/CustomComponents'
import { subtitleFormat, titleFormat } from '../../customStyles/CustomStyles';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CatCardImage from '../../assets/cat.png';
import DogCardImage from '../../assets/dog.png';

const Ordering = () => {
  const navigate = useNavigate();
  const [selectedCombo, _, pets, setPets, selectedPet, setSelectedPet] = useOutletContext();

  const retrievePets = () => {
    let users = JSON.parse(localStorage.getItem('users'));
    let currentUser = users.filter(user => user.user === sessionStorage.username);
    setPets(currentUser[0].pets.filter(pet => pet.type === selectedCombo))
  }

  useEffect(() => {
    retrievePets();
  }, [])
  
  return (
    <Grid container sx={{height: '90%'}} className='animate__animated animate__fadeIn'>
      {
        pets.length === 0 && (
          <Grid item xs={12}>
            <CustomFlexedBox height='100%'>
              <Typography sx={{...titleFormat(), color: 'white'}}>
                Oops, it seems you don't have {selectedCombo === 'dog' ? 'doggos' : 'kittens'} registered.
              </Typography>
              <Typography sx={{...subtitleFormat(), color: 'white'}}>
                If you want, you can register one now or select a combo for kittens.
              </Typography>
              <Box sx={{ marginTop: '15px', marginLeft: '15px' }}>
                <CustomButtonPrimaryFilled onClick={() => navigate(-1, {replace: true})} sx={{marginRight: '1rem'}}>
                  <Typography>GO BACK</Typography>
                </CustomButtonPrimaryFilled>
                <CustomButtonPrimaryFilled onClick={() => navigate('/register-pets')}>
                  <Typography>YES, TAKE ME TO REGISTER PETS</Typography>
                </CustomButtonPrimaryFilled>
              </Box>
            </CustomFlexedBox>
          </Grid>
        )
      }
      {
        pets.length > 0 && (
          <Grid item xs={12}>
            <CustomFlexedBox height='100%'>
              <Typography sx={{...titleFormat(), color: 'white'}}>
                One step closer to make them happy!
              </Typography>
              <Typography sx={{...subtitleFormat(), color: 'white'}}>
                Please choose for which one of your {selectedCombo === 'cat' ? 'kitties' : 'doggos'} would you like this combo?
              </Typography>
              <CustomFlexedBox sx={{flexDirection: 'row', marginTop: '2rem'}}>
                {
                  pets.map(pet => (
                    <CustomCard key={pet.id} onClick={() => {setSelectedPet(pet); navigate('/products/confirm-order')}} sx={{width: '150px', height: '170px', marginRight: '1rem'}}>
                      <CardMedia
                        sx={{width: '30%', marginTop: '1rem'}}
                        component="img"
                        image={selectedCombo === 'cat' ? CatCardImage : DogCardImage}
                        alt="PetImage"
                      />
                      <CardContent sx={{textAlign: 'center'}}>
                        <Typography sx={{...subtitleFormat(), fontSize: '1rem', fontWeight: '600', color: '#38AA95'}}>
                          {pet.petName}
                        </Typography>
                        <Box textAlign='center'>
                          <Typography sx={{...subtitleFormat(), fontSize: '.8rem', fontWeight: '600'}}>
                            {pet.isCastrated ? 'Castrated' : 'Not castrated'}
                          </Typography>
                          <Typography sx={{...subtitleFormat(), fontSize: '.8rem', fontWeight: '600',}}>
                            {pet.petAge} year/s
                          </Typography>
                          <Typography sx={{...subtitleFormat(), fontSize: '.8rem', fontWeight: '600'}}>
                            {pet.petWeight} Kgs
                          </Typography>
                        </Box>
                      </CardContent>
                    </CustomCard>
                  ))
                }
              </CustomFlexedBox>
              <CustomButtonPrimaryFilled sx={{marginTop: '1rem'}} onClick={() => navigate(-1, {replace: true})}>
                <Typography>GO BACK</Typography>
              </CustomButtonPrimaryFilled>
            </CustomFlexedBox>                        
          </Grid>
        )
      }
    </Grid>
  )
}

export default Ordering