import React, { useContext, useState } from 'react';
import { Box } from '@mui/system';
import { AppBar, Avatar, Button, Container, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppContext from '../../AppContext';
import Logo from '../../assets/logo.jpg';
import AvatarIcon from '../../assets/avatar.png';
import { textFormat } from '../../customStyles/CustomStyles';

const AppNavbar = () => {

  // const userName = sessionStorage.username;
  const userName = 'emmanuel.m.lopez'
  const [anchorEl, setAnchorEl] = useState(null);
  const { setIsLogged } = useContext(AppContext);

  const logOut = () => {
    sessionStorage.setItem('loggedUser', false);
    setIsLogged(false);
  }

  return (

    <AppBar position="static" sx={{background: 'white'}} className='animate__animated animate__fadeIn'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center" justifyContent='space-between' width="100%">
            <Box>
              <img src={Logo} alt="QFisicas-Logo" style={{objectFit: 'cover'}} />
            </Box>

            {/* TODO */}
            {/* <LanguageChanger /> */}

            <Box display="inline-flex" alignItems="center">
              <Avatar
                sx={{
                  width: '40px',
                  height: '40px',
                  transition: '0.3s',
                  marginRight: '10px'
                }}
                src={AvatarIcon}
              />
              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={<ExpandMoreIcon style={{ color: '#38AA95'}}/>}
              >
                <Typography noWrap sx={{...textFormat(), fontWeight: '500', color: '#38AA95'}}>
                  {userName?.toUpperCase()}
                </Typography>
              </Button>
              <Menu
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical:'bottom', horizontal: 'right'}}
                transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                disableScrollLock
              >
                <MenuItem
                  onClick={() => { setAnchorEl(null); logOut();}}
                  sx={{...textFormat(), color: '#38AA95', fontWeight: '400'}}
                >
                  LOGOUT
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default AppNavbar;