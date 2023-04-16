import { Box, Button, InputBase, TextField, styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";


export const CustomFlexedBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export const CustomFullHeightFlexedBox = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

export const CustomButtonPrimary = styled(Button)({
  border: '2px solid white',
  borderRadius: '30px',
  '&:hover': {
    border: '2px solid white',
    backgroundColor: 'rgba(0,0,1,0.1)',
    color: 'rgba(0,0,0,0.2)'
  },
  '& .MuiTypography-root': {
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontSize: '1rem',
    letterSpacing: 0,
    fontWeight: '300',
    color: 'white',
    padding: '5px 25px'
  },
})

export const CustomButtonSecondary = styled(Button)({
  borderRadius: '30px',
  backgroundColor: '#38AA95',
  '&:hover': {
    backgroundColor: '#319280',
    color: 'rgba(0,0,0,0.2)'
  },
  '& .MuiTypography-root': {
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontSize: '1rem',
    letterSpacing: 0,
    fontWeight: '300',
    color: 'white',
    padding: '5px 25px'
  },
});

export const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    fontFamily: 'Poppins',
    background: '#F4F8F7',
    // background: '#EAF0EF',
  },
  '& .MuiInputBase-root:before':{
    display: 'none'
  },
  '& .MuiInputBase-root:after':{
    borderBottom: '2px solid #38AA95'
  },
  '& label': {
    fontFamily: 'Poppins',
  },
  '& label.Mui-focused': {
    color: '#38AA95',
  },
});

export const CustomSuccessSnackbar = styled(MaterialDesignContent)({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#38AA95',
  },
})