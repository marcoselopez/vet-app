import { Grid, TextField, Typography } from "@mui/material"
import { textFormat, titleFormat } from "../../customStyles/CustomStyles"
import { CustomButtonPrimary, CustomButtonSecondary, CustomFlexedBox, CustomTextField } from "../../customComponents/CustomComponents"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import AppContext from "../../AppContext"
import { enqueueSnackbar } from "notistack"


const LoginForm = () => {

  const { setIsLogged } = useContext(AppContext);
  const { register, handleSubmit, formState: {errors} } = useForm();

  const handleLogin = (loginInfo) => {
    //Get the users array from localStorage
    const users = JSON.parse(localStorage.getItem('users'));
    //If the email does not exists on the array, inform the user
    if(!users.some(element => element.email === loginInfo.email)){
      enqueueSnackbar('The user does not exists', {variant: 'error'})
      return
    }

    //If the password in the array is not equal to the provided in login form, inform the user
    if(!users.some(element => element.password === loginInfo.password)){
      enqueueSnackbar('Wrong password, please try again', {variant: 'error'})
      return
    }

    //If all the checks pass, log the user
    sessionStorage.setItem('loggedUser', true);
    enqueueSnackbar('Successful Log In!', { variant: 'success' });
    setIsLogged(true);
  }

  return (
    <CustomFlexedBox width='50%'>

    <form onSubmit={handleSubmit(handleLogin)}>
      <Grid container justifyContent='center'>

        <Grid item xs={12} marginTop='1rem'>
            <CustomTextField 
              fullWidth
              variant="filled"
              label={'Email'}
              type="email"
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
            <Typography sx={{...textFormat(), fontWeight: '400'}}>
              <Link style={{color: '#38AA95'}}>Forgot your password?</Link>
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <CustomFlexedBox>
              <CustomButtonSecondary sx={{ marginTop: '1rem'}} fullWidth type="submit">
                <Typography>SIGN IN</Typography>
              </CustomButtonSecondary>
            </CustomFlexedBox>
          </Grid>

        </Grid>
      </form>
    </CustomFlexedBox>
  )
};

export default LoginForm;