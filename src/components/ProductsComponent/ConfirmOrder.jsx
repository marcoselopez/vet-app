import { Box, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { subtitleFormat, textFormat, titleFormat } from '../../customStyles/CustomStyles'
import { CustomButtonPrimaryFilled, CustomCardNoClick, CustomFlexedBox } from '../../customComponents/CustomComponents'
import Bowl from '../../assets/bowl.png';
import { useNavigate, useOutletContext } from 'react-router-dom';
import nextId from "react-id-generator";

const ConfirmOrder = () => {

  const [selectedCombo, setSelectedCombo, pets, setPets, selectedPet, setSelectedPet] = useOutletContext();

  const isCat = selectedPet.type === 'cat';
  const isDog = selectedPet.type === 'dog';
  const [foodAmount, setFoodAmount] = useState(null);
  const [firstComplement, setFirstComplement] = useState(null);
  const [secondComplement, setSecondComplement] = useState(null);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const navigate = useNavigate();
  const generatedId = nextId();

  const foodQuantity = () => {
    if(isCat){
      return (selectedPet.petWeight * 0.5).toFixed(1);
    }
    if(isDog){
      return (selectedPet.petWeight * 0.8).toFixed(1);
    }
  }

  const isFirstComplement = () => {
    if(isCat){
      if(selectedPet.petAge > 5){
        return 1
      } else {
        return 0
      }
    }
    if(isDog){
      let operation = selectedPet.petAge / 3;
      return Math.floor(operation)
    }
  }

  const isSecondComplement = () => {
    if(isCat){
      return selectedPet.isCastrated
    }
    if(isDog){
      if(selectedPet.isCastrated && selectedPet.petAge > 5){
        return true
      }
    }
    return false;
  }

  const gridSizeCalculator = () => {
    if(isFirstComplement() > 0 && !isSecondComplement()){
      return 6
    }
    if(!isFirstComplement() > 0 && isSecondComplement()){
      return 6
    }
    if(isFirstComplement() > 0 && isSecondComplement()){
      return 8
    }
    return 4
  }

  const handleConfirm = () => {    
    let order = {
      id: generatedId,
      placedBy: sessionStorage.username,
      petName: selectedPet.petName,
      type: selectedPet.type,
      orderAmount: foodAmount,
      firstComplement: firstComplement,
      secondComplement: secondComplement,
      orderDate: new Date().toUTCString(),
      status: 'active'
    };
    
    let users = JSON.parse(localStorage.getItem('users'));
    let currentUser = users.filter(user => user.user === sessionStorage.username);
    let totalOrders = JSON.parse(localStorage.getItem('totalOrders'));
    currentUser[0].orders.push(order)
    localStorage.setItem('users', JSON.stringify(users));
    totalOrders.push(order);
    localStorage.setItem('totalOrders', JSON.stringify(totalOrders));

    setIsOrderConfirmed(true);
  }

  useEffect(() => {
    setFoodAmount(foodQuantity());
    setFirstComplement(isFirstComplement());
    if(isSecondComplement()){
      setSecondComplement(1)
    } else {
      setSecondComplement(0)
    }
  }, [])

  if(isOrderConfirmed){
    return (
      <Grid container height='90%' display='flex' justifyContent='center' alignItems='center'>
        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='center' alignItems='center' className='animate__animated animate__fadeIn'>
          <Typography sx={{...titleFormat(), color: 'white'}} className='animate__animated animate__zoomIn'>
            THANK YOU!
          </Typography>
          <Typography sx={{...subtitleFormat(), color: 'white'}}>
            Your order has been placed.
          </Typography>
          <Typography sx={{...subtitleFormat(), color: 'white'}}>
            You can check your order history and status on the dashboard, or you can continue ordering.
          </Typography>
          <Box sx={{marginTop: '1rem'}}>
            <CustomButtonPrimaryFilled sx={{marginRight: '1rem'}} onClick={() => navigate('/products/presentation')}>
              <Typography>BACK TO SHOP</Typography>
            </CustomButtonPrimaryFilled>
            <CustomButtonPrimaryFilled onClick={() => navigate('/dashboard')}>
              <Typography>DASHBOARD</Typography>
            </CustomButtonPrimaryFilled>
          </Box>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container height='90%' display='flex' justifyContent='center' alignItems='center' className='animate__animated animate__fadeIn'>
      <Grid item xs={3} height='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='flex-end'>
        <Typography sx={{...titleFormat(), color: 'white', textAlign: 'right'}}>The right combo!</Typography>
        <Typography sx={{...subtitleFormat(), color: 'white', textAlign: 'right'}}>This is the best choice for your furry friend</Typography>
        <Box>
          <CustomButtonPrimaryFilled sx={{marginTop: '1rem', marginRight: '1rem'}} onClick={() => navigate(-1, {replace: true})}>
            <Typography>GO BACK</Typography>
          </CustomButtonPrimaryFilled>
          <CustomButtonPrimaryFilled sx={{marginTop: '1rem'}} onClick={() => handleConfirm()}>
            <Typography>CONFIRM</Typography>
          </CustomButtonPrimaryFilled>
        </Box>
      </Grid>
      <Grid item xs={gridSizeCalculator()} height='100%' display='flex' justifyContent='center' alignItems='center'>
        <CustomFlexedBox sx={{flexDirection: 'row'}} marginTop='2rem'>
          <CustomCardNoClick sx={{ width: '300px', height: '400px', marginRight: '1rem'}} className='animate__animated animate__fadeInRight'>
            <CardMedia
              sx={{width: '30%', marginTop: '1rem'}}
              component="img"
              image={Bowl}
              alt="DogFoodImage"
            />
            <CardContent sx={{ textAlign: 'center'}}>
              <Typography sx={{...subtitleFormat(), fontSize: '1.2rem', fontWeight: '600', color: '#38AA95'}}>
                YOU WILL RECEIVE
              </Typography>
              <Typography sx={{...subtitleFormat(), fontSize: '4rem', fontWeight: '600', color: '#38AA95'}}>
                {foodQuantity()} KG
              </Typography>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography sx={{...subtitleFormat(), color: '#38AA95', fontWeight: '400'}}>
                  of our best formula!
                </Typography>
              </Box>
            </CardContent>
          </CustomCardNoClick>
          
          {
            isFirstComplement() !== 0 && (
              <>
                <Typography sx={{...titleFormat(), color: 'white', fontSize: '5rem'}}>+</Typography>

                <CustomCardNoClick sx={{ width: '150px', height: '200px', margin: '0 1rem'}} className='animate__animated animate__fadeInRight animate__delay-1s'>
                  <CardContent sx={{ textAlign: 'center'}}>
                    <Typography sx={{...subtitleFormat(), fontSize: '2rem', fontWeight: '600', color: '#38AA95'}}>
                      {isFirstComplement()}
                    </Typography>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                      <Typography sx={{...textFormat(), fontWeight: '400', color: '#38AA95', fontSize: '.8rem'}}>
                        Dietary complement for {isCat ? 'kitties older than 5 years' : 'doggos every 3 years of age'}
                      </Typography>
                    </Box>
                  </CardContent>
                </CustomCardNoClick>
              </>
            )
          }
          {
            isSecondComplement() && (
              <>
                <Typography sx={{...titleFormat(), color: 'white', fontSize: '5rem'}}>+</Typography>

                <CustomCardNoClick sx={{ width: '150px', height: '200px', margin: '0 1rem'}} className='animate__animated animate__fadeInRight animate__delay-1s'>
                  <CardContent sx={{ textAlign: 'center'}}>
                    <Typography sx={{...subtitleFormat(), fontSize: '2rem', fontWeight: '600', color: '#38AA95'}}>
                      1
                    </Typography>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                      <Typography sx={{...textFormat(), fontWeight: '400', color: '#38AA95', fontSize: '.8rem'}}>
                        Extra dietary complement for {isCat ? 'castrated kitties' : 'castrated doggos older than 5 years'}
                      </Typography>
                    </Box>
                  </CardContent>
                </CustomCardNoClick>
              </>
            )
          }
        </CustomFlexedBox>
      </Grid>
    </Grid>
  )
};

export default ConfirmOrder;