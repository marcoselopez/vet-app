import { Dialog, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { CustomButtonSecondary, CustomFlexedBox, CustomSelect, CustomTextField } from '../../customComponents/CustomComponents';

const NewUserDialog = ({ open, onDialogClose }) => {

  const {register, handleSubmit, formState: {errors}, getValues, control, reset} = useForm();

  const handleRegister = (data) => {
    reset();
    onDialogClose(data)
  };

  const onCancel = () => {
    onDialogClose(null)
  }

  return (
    <Dialog fullWidth open={open} onClose={onCancel}>
      <DialogTitle>
        ADD NEW USER
      </DialogTitle>
      <DialogContent>
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

          <Grid item xs={12} marginTop='1rem'>
            <Controller
              control={control}
              name='role'
              defaultValue={''}
              render={({
                field: {onChange, value}
              }) => (
                <FormControl fullWidth>
                  <InputLabel sx={{fontFamily: 'Poppins', '&.Mui-focused': {color: '#38AA95'}}} id="demo-simple-select-label">Role</InputLabel>
                  <CustomSelect
                    labelId="demo-simple-select-label"
                    label="Role"
                    value={value}
                    onChange={onChange}
                  >
                    <MenuItem sx={{fontFamily: 'Poppins'}} value={'client'}>Client</MenuItem>
                    <MenuItem sx={{fontFamily: 'Poppins'}} value={'admin'}>Admin</MenuItem>
                  </CustomSelect>
                </FormControl>
              )} 
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
      </DialogContent>
    </Dialog>
  )
};

export default NewUserDialog;