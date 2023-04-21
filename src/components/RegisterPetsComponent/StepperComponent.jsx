import { useState } from 'react'
import { CustomButtonPrimaryFilled, CustomCard, CustomFlexedBox, CustomTextFieldSecondary } from '../../customComponents/CustomComponents';
import { Box, CardContent, CardMedia, FormControlLabel, Grid, Switch, Typography } from '@mui/material';
import { subtitleFormat, textFormat } from '../../customStyles/CustomStyles';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DogCardImage from '../../assets/dog.png';
import CatCardImage from '../../assets/cat.png';
import nextId from "react-id-generator";

const StepperComponent = () => {

  const generatedId = nextId();

  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [type, setType] = useState(null);

  const {register, handleSubmit, formState: {errors}, reset, control, getValues, setValue} = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem('users'))
    let currentUser = users.filter(user => user.user === sessionStorage.username)
    currentUser[0].pets.push({...data, type: type, id: generatedId})
    localStorage.setItem('users', JSON.stringify(users))
    reset();
    setStepTwo(false);
    setStepThree(true);
  }

  return (
    <CustomFlexedBox sx={{justifyContent: 'flex-start'}} width='100%' height='100%' textAlign='center'>
      <Typography sx={{...subtitleFormat(), color: 'white', fontSize: '1.5rem', fontWeight: '300'}} className='animate__animated animate__fadeInDown'>
        {stepOne && 'What kind of furry friend do you have?'}
        {stepTwo && 'Tell us a little bit about him or her!'}
        {stepThree && 'Thank you!'}
      </Typography>

      <Grid container gap={4} justifyContent='center' marginTop='1rem'>
        {
          stepOne && (
            <>
              <Grid item xs={4} className='animate__animated animate__fadeIn'>
                <CustomCard onClick={() => {setType('dog'); setStepOne(false); setStepTwo(true)}}>
                  <CardMedia
                    sx={{width: '50%', marginTop: '1rem'}}
                    component="img"
                    image={DogCardImage}
                    alt="DogCardImage"
                  />
                  <CardContent>
                    <Typography sx={{...subtitleFormat(), fontSize: '1.5rem', fontWeight: '600', color: '#38AA95'}}>DOGGO</Typography>
                  </CardContent>
                </CustomCard>
                
              </Grid>
              <Grid item xs={4} className='animate__animated animate__fadeIn'>
                <CustomCard onClick={() => {setType('cat'); setStepOne(false); setStepTwo(true)}}>
                  <CardMedia
                    sx={{width: '50%', marginTop: '1rem'}}
                    component="img"
                    image={CatCardImage}
                    alt="CatCardImage"
                  />
                  <CardContent>
                    <Typography sx={{...subtitleFormat(), fontSize: '1.5rem', fontWeight: '600', color: '#38AA95'}}>KITTY</Typography>
                  </CardContent>
                </CustomCard>
              </Grid>
            </>
          )
        }
        {
          stepTwo && (
            <Grid item xs={6} marginTop='1rem' className='animate__animated animate__fadeIn'>
              <form width='100%' onSubmit={handleSubmit(onSubmit)}>
                <CustomTextFieldSecondary 
                  fullWidth
                  variant="filled"
                  label={'Name'}
                  type="text"
                  inputProps={{
                    ...register('petName', {
                      required: '*This field is required', 
                      minLength: {value: 3, message: '*Must have at least 3 characters'}, 
                      maxLength: {value: 50, message: '*Must have up to 50 characters'}
                    })
                  }}
                  error={errors.petName ? true : false}
                  helperText={errors.petName ? errors.petName.message : null}
                />
                <Box display='flex' justifyContent='space-between'>
                  <CustomTextFieldSecondary
                    sx={{ marginTop: '1rem', width: '49%' }}
                    fullWidth
                    variant="filled"
                    label={'Age'}
                    type="number"
                    inputProps={{
                      ...register('petAge', {
                        required: '*This field is required', 
                        minLength: {value: 1, message: 'Must have at least 1 digit'}, 
                        maxLength: {value: 2, message: 'Must have up to 2 digits'}
                      })
                    }}
                    error={errors.petAge ? true : false}
                    helperText={errors.petAge ? errors.petAge.message : null}
                  />
                  <CustomTextFieldSecondary
                    sx={{ marginTop: '1rem', width: '49%' }}
                    fullWidth
                    variant="filled"
                    label={'Weight in Kgs'}
                    type="number"
                    inputProps={{
                      ...register('petWeight', {
                        required: '*This field is required', 
                        minLength: {value: 1, message: '*Must have at least 1 digit'}, 
                        maxLength: {value: 2, message: '*Must have up to 2 digits'}
                      })
                    }}
                    error={errors.petWeight ? true : false}
                    helperText={errors.petWeight ? errors.petWeight.message : null}
                  />
                </Box>
                <Box display='flex' justifyContent='center' sx={{ marginTop: '1rem' }}>
                  <Typography sx={{...textFormat(), color: 'white', alignSelf: 'center', marginTop: '25px'}}>NO</Typography>
                  <Controller
                    control={control}
                    name="isCastrated"
                    // rules={{ required: 'This field is required'}} //This sets requirements
                    defaultValue={false}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                    }) => (
                      <FormControlLabel
                        value="top"
                        sx={{ margin: 0, marginTop: 0 }}
                        label={<Typography sx={{...subtitleFormat(), color: 'white'}}>Castrated?</Typography>}
                        labelPlacement="top"
                        control={<Switch 
                          checked={value}
                          onChange={onChange}
                          inputRef={ref}
                          // onError={console.log(error)} //Here we can check the error object
                          sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                              color: '#33E0C0',
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                              backgroundColor: '#33E0C0',
                            }
                          }}
                        />}
                      />                      
                    )}
                  />
                  <Typography sx={{...textFormat(), color: 'white', alignSelf: 'center', marginTop: '25px'}}>SI</Typography>
                </Box>
                <Box width='100%' marginTop='1rem'>
                  <CustomButtonPrimaryFilled sx={{ marginRight: '1rem' }} onClick={() => {setStepTwo(false); setStepOne(true)}}>
                    <Typography>GO BACK</Typography>
                  </CustomButtonPrimaryFilled>
                  <CustomButtonPrimaryFilled type='submit'>
                    <Typography>ACCEPT</Typography>
                  </CustomButtonPrimaryFilled>
                </Box>
              </form>
            </Grid>            
          )
        }
        {
          stepThree && (
            <Grid item xs={8} className='animate__animated animate__fadeIn'>
              <Typography sx={{...subtitleFormat(), color: 'white', fontWeight: '300'}}>
                Your pet has been registered, you can start ordering packages or you can register another pet.
              </Typography>
              <Box width='100%' marginTop='1rem'>
                <CustomButtonPrimaryFilled sx={{ marginRight: '1rem' }} onClick={() => navigate(`/products`)}>
                  <Typography>START ORDERING</Typography>
                </CustomButtonPrimaryFilled>
                <CustomButtonPrimaryFilled type='submit' onClick={() => {setStepThree(false); setStepOne(true)}}>
                  <Typography>REGISTER ANOTHER</Typography>
                </CustomButtonPrimaryFilled>
              </Box>
            </Grid>
          )
        }
      </Grid>

    </CustomFlexedBox>
  )
}

export default StepperComponent