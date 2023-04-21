import { Box, Button, Card, Chip, List, Select, TextField, styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";
import { textFormat } from "../customStyles/CustomStyles";


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

export const CustomButtonPrimaryFilled = styled(Button)({
  borderRadius: '30px',
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#E5E8E8',
    color: 'rgba(0,0,0,0.2)'
  },
  '& .MuiTypography-root': {
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontSize: '1rem',
    letterSpacing: 0,
    fontWeight: '400',
    color: '#38AA95',
    padding: '5px 25px'
  },
});

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

export const CustomButtonSecondaryOutlined = styled(Button)({
  border: '2px solid #38AA95',
  borderRadius: '30px',
  '&:hover': {
    border: '2px solid #38AA95',
    backgroundColor: 'rgba(0,0,1,0.1)',
    color: 'rgba(0,0,0,0.2)'
  },
  '& .MuiTypography-root': {
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: '1rem',
    letterSpacing: 0,
    color: '#38AA95',
    padding: '5px 25px'
  },
})

export const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    fontFamily: 'Poppins',
    background: '#F4F8F7'
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

export const CustomTextFieldSecondary = styled(TextField)({
  '& .MuiInputBase-root': {
    fontFamily: 'Poppins',
    background: '#F4F8F7'
  },
  '& .MuiInputBase-root:before':{
    display: 'none'
  },
  '& .MuiInputBase-root:after':{
    display: 'none'
  },
  '& .MuiInputBase-root:active':{
    background: '#F4F8F7'
  },
  '& .MuiInputBase-root:hover': {
    backgroundColor: '#E1E5E4'
  },
  '& label': {
    fontFamily: 'Poppins',
  },
  '& label.Mui-focused': {
    color: '#38AA95',
  },
  '& .MuiInputBase-root.Mui-focused': {
    background: '#F4F8F7'
  },
  '& .MuiFormHelperText-root.Mui-error': {
    fontFamily: 'Poppins',
    color: '#F4F8F7'
  }
});

export const CustomSelect = styled(Select)({
  '& .MuiSelect-select': {
    fontFamily: 'Poppins',
    background: '#F4F8F7',
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#38AA95',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#38AA95',
  },
});

export const CustomSuccessSnackbar = styled(MaterialDesignContent)({
  '&.notistack-MuiContent-success': {
    backgroundColor: '#38AA95',
  },
});

export const CustomCard = styled(Card)({
  transitionDuration: '200ms',
  transitionProperty: 'transform',
  '&:hover': {
    transform: 'translateY(-10px)',
    cursor: 'pointer'
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

export const CustomCardNoClick = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

export const CustomChip = styled(Chip)({
  ...textFormat(),
  color: 'white', 
  fontWeight: '400', 
  fontSize: '.8rem', 
  background: '#38AA95',
  marginRight: '.5rem',
  '&.MuiChip-root': {
    borderRadius: '5px'
  }
});

export const CustomChipBlank = styled(Chip)({
  ...textFormat(),
  color: 'white', 
  fontWeight: '400', 
  fontSize: '.8rem',
  marginRight: '.5rem',
  '&.MuiChip-root': {
    borderRadius: '5px'
  }
});

export const CustomList = styled(List)({
  width: '100%', 
  height: '100%', 
  overflowY: 'auto',
  margin: '2rem 0',
  borderRadius: '5px',
  boxShadow: '0px 1.9px 8.5px rgba(0, 0, 0, 0.146), 0px 15px 68px rgba(0, 0, 0, 0.3)',
  background: 'white'
})