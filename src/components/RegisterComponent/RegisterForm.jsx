import { Grid, Typography } from '@mui/material'
import { CustomButtonSecondary, CustomFlexedBox, CustomTextField } from '../../customComponents/CustomComponents'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { enqueueSnackbar } from 'notistack'
import nextId from "react-id-generator";
import AppContext from '../../AppContext';

const RegisterForm = () => {

  const { setIsLogged } = useContext(AppContext);
  const { register, handleSubmit, formState: {errors}, getValues} = useForm();
  const generatedId = nextId()

  const handleRegister = (data) => {
    //Get the users array
    let users = JSON.parse(localStorage.getItem('users'))
    let role = 'client'
    let pets = []
    let orders = []

    if(users === null || users === undefined){
      enqueueSnackbar('An error has ocurred, please try again', {variant: 'error'})
      location.reload()
    }

    //Check if the array contains the email to be registered
    if(users.some(element => element.email === data.email)){
      enqueueSnackbar('The email has already been used', {variant: 'error'})
      return
    }
    //If the email does not exists, push the user, save the array again, set the logged to true and log the user
    users.push({
      id: generatedId,
      user: data.email.split('@')[0],
      email: data.email,
      password: data.password,
      role: role,
      pets: pets,
      orders: orders
    })
    localStorage.setItem('users', JSON.stringify(users))
    sessionStorage.setItem('username', data.email.split('@')[0])
    sessionStorage.setItem('role', role)
    sessionStorage.setItem('loggedUser', true);
    setIsLogged(true)
    enqueueSnackbar('Account succesfully created!', {variant: 'success'})
  };

  return (
    <CustomFlexedBox width='50%'>

      <form onSubmit={handleSubmit(handleRegister)}>

        <Grid container justifyContent='center'>        
          <Grid item xs={12} marginTop='1rem'>
            <CustomTextField 
              fullWidth
              variant="filled"
              label={'Email'}
              inputProps={{
                ...register('email', {
                  required: 'This field is required',   
                  minLength: {value: 10, message: 'Must have at least 10 characters'}, 
                  maxLength: {value: 50, message: 'Must have less than 50 characters'}
                })
              }}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
              />
          </Grid>

          <Grid item xs={12} marginTop='1rem'>
            <CustomTextField 
              fullWidth
              type="password"
              variant="filled"
              label={'Password'}
              inputProps={{
                ...register('password', {
                  required: 'This field is required',
                  minLength: {value: 5, message: 'Password must be at least 5 characters long'},
                  maxLength: {value: 15, message: 'Password must be up to 15 characters long'}
                })
              }}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
              />
          </Grid>

          <Grid item xs={12} marginTop='1rem'>
            <CustomTextField 
              fullWidth
              type="password"
              variant="filled"
              label={'Confirm Password'}
              inputProps={{
                ...register('confirmPassword', {
                  required: 'This field is required',
                  minLength: {value: 5, message: 'Password must be at least 5 characters long'},
                  maxLength: {value: 15, message: 'Password must be up to 15 characters long'},
                  validate: (val) => {
                    const {password} = getValues();
                    return password === val || 'Passwords do not match'
                  }
                })
              }}
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
              />
          </Grid>

          <Grid item xs={6}>
            <CustomFlexedBox>
              <CustomButtonSecondary sx={{ marginTop: '1rem'}} fullWidth type='submit'>
                <Typography>SIGN UP</Typography>
              </CustomButtonSecondary>
            </CustomFlexedBox>
          </Grid>
        </Grid>

      </form>
    </CustomFlexedBox>
  )
};

export default RegisterForm;