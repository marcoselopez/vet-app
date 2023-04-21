import { Grid, Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemIcon, IconButton, Tooltip, Chip, ListItemButton, Collapse } from '@mui/material';
import Peaks from '../../assets/peaks.svg';
import { subtitleFormat, textFormat, titleFormat } from '../../customStyles/CustomStyles';
import { useEffect, useState } from 'react';
import CatAvatar from '../../assets/catAvatar.png';
import DogAvatar from '../../assets/dogAvatar.png';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButtonPrimaryFilled, CustomChip, CustomChipBlank, CustomFlexedBox } from '../../customComponents/CustomComponents';
import { useNavigate } from 'react-router-dom';
import ShopAvatar from '../../assets/shopAvatar.png';
import ClientAvatar from '../../assets/sellerAvatar.png';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const AdminDashboardComponent = () => {

  const [orders, setOrders] = useState([]);
  const [users, setUsers]  = useState([]);
  const [isOrdersPage, setisOrdersPage] = useState(false);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();


  const handleClick = (id) => {
    if(open === id){
      setOpen(null)
    } else {
      setOpen(id);
    }
  };

  const retrieveInfo = () => {
    let users = JSON.parse(localStorage.getItem('users'));
    let orders = JSON.parse(localStorage.getItem('totalOrders'));
    setUsers(users);
    setOrders(orders);
  }
  
  useEffect(() => {
    retrieveInfo();
  }, [])

  return (
    <Grid container height='100%' className='animate__animated animate__fadeIn'>
      <Grid item xs={12}>
        <Box
          width='100%' 
          height='100%'
          sx={{
            background: `url(${Peaks})`, 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}>

            <Grid container height='50%' display='flex' justifyContent='center' alignItems='center'>
              <Grid item xs={12} display='flex' justifyContent='center' alignItems='center' sx={{marginTop: '5rem'}}>
                <Typography sx={{...titleFormat(), color: 'white', fontWeight: '600'}}>{!isOrdersPage ? 'USER LIST' : 'ORDER LIST'}</Typography>
              </Grid>

              <Grid 
                  item 
                  xs={9} 
                  height='100%' 
                  display='flex' 
                  flexDirection='column' 
                  justifyContent='center' 
                  alignItems='center'
              >
                <List 
                  sx={{
                    width: '100%', 
                    height: '100%', 
                    overflowY: 'auto',
                    margin: '2rem 0',
                    borderRadius: '5px',
                    boxShadow: '0px 1.9px 8.5px rgba(0, 0, 0, 0.146), 0px 15px 68px rgba(0, 0, 0, 0.3)',
                    background: 'white'
                  }}
                >
                  {isOrdersPage && orders.length === 0 && 
                    <CustomFlexedBox sx={{flexDirection: 'row', height: '100%'}}>
                      <Typography sx={{...subtitleFormat()}}>There are currently no orders</Typography>
                    </CustomFlexedBox>
                  }
                  {
                    !isOrdersPage ?
                    users.map(user => (
                      <div key={user.id}>
                        <ListItemButton onClick={() => handleClick(user.id)} sx={{'&:hover': {background: '#E9E9E9'}}} className='animate__animated animate__fadeInUp'>
                          <ListItemAvatar>
                            <Avatar alt='petAvatar' src={user.role === 'client' ? ClientAvatar : ShopAvatar} />
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography sx={{...textFormat(), textAlign: 'left', fontWeight: '400'}}>{user.user}</Typography>
                          </ListItemText>
                          <CustomChipBlank size='small' variant='filled' color={user.role === 'client' ? 'secondary' : 'warning'} label={`${user.role.toUpperCase()}`} />
                          {
                            user.role === 'client' && 
                            <CustomChipBlank size='small' variant='filled' color={user.role === 'client' ? 'secondary' : 'warning'} label={`Pets: ${user.pets.length}`} />
                          }
                          {
                            user.pets.length > 0 && (
                              open === user.id ? <ExpandLess /> : <ExpandMore />
                            )
                          }
                        </ListItemButton>
                        <Collapse in={open === user.id ? true : false} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {
                              user.pets.map(pet => (
                                <ListItem key={pet.id} sx={{'&:hover': {background: '#E9E9E9'}, marginLeft: '2rem', width: '90%'}} className='animate__animated animate__fadeInUp'>
                                  <ListItemAvatar>
                                    <Avatar sx={{height: '24px', width: '24px', marginLeft: '1rem'}} alt='petAvatar' src={pet.type === 'dog' ? DogAvatar : CatAvatar} />
                                  </ListItemAvatar>
                                  <ListItemText>
                                    <Typography sx={{...textFormat(), textAlign: 'left', fontWeight: '400'}}>{pet.petName}</Typography>
                                  </ListItemText>
                                  <CustomChip size='small' variant='filled' label={`Age: ${pet.petAge}`} />
                                  <CustomChip size='small' variant='filled' label={`Weight: ${pet.petWeight}`} />
                                  <CustomChip size='small' variant='filled' label={pet.isCastrated ? 'Castrated' : 'Not castrated'} />
                                </ListItem>
                              ))
                            }
                          </List>
                        </Collapse>
                      </div>
                    ))
                    :
                    orders.map(order => (
                      <ListItem key={order.id} sx={{'&:hover': {background: '#E9E9E9'}}} className='animate__animated animate__fadeInUp'>
                        <ListItemAvatar>
                          <Avatar alt='orderAvatar' src={ShopAvatar} />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography sx={{...textFormat(), textAlign: 'left', color: '#38AA95', fontWeight: '400'}}>From {order.placedBy}</Typography>
                          <Typography sx={{...textFormat(), textAlign: 'left', fontWeight: '400'}}>
                            Placed on: {new Date(order.orderDate).toLocaleDateString()}
                          </Typography>
                        </ListItemText>
                        <CustomChip size='small' variant='filled' label={`Combo: ${order.orderAmount} KG`} />
                        <CustomChip size='small' variant='filled' label={`Dietary Complements: ${order.firstComplement}`} />
                        <CustomChip size='small' variant='filled' label={`Extra Dietary Complements: ${order.secondComplement}`} />
                        <CustomChipBlank size='small' variant='filled' label={`${order.status.toUpperCase()}`} color={order.status === 'active' ? 'secondary' : 'error'} />
                      </ListItem>
                    ))
                  }
                </List>
              </Grid>

              <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                {
                  !isOrdersPage ? (
                    <Box>
                      <CustomButtonPrimaryFilled sx={{marginRight: '1rem'}}>
                        <Typography>ADD NEW USER</Typography>
                      </CustomButtonPrimaryFilled>
                      <CustomButtonPrimaryFilled onClick={() => setisOrdersPage(!isOrdersPage)}>
                        <Typography>SEE ORDERS</Typography>
                      </CustomButtonPrimaryFilled>
                    </Box>
                  ) : (
                    <Box>
                      <CustomButtonPrimaryFilled onClick={() => setisOrdersPage(!isOrdersPage)}>
                        <Typography>SEE USERS</Typography>
                      </CustomButtonPrimaryFilled>
                    </Box>
                  )
                }
              </Grid>
            </Grid>

        </Box>
      </Grid>
    </Grid>
  )
}

export default AdminDashboardComponent