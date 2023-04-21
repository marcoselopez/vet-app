import { Grid, Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemIcon, IconButton, Tooltip, Chip, ListItemButton, Collapse } from '@mui/material';
import Peaks from '../../assets/peaks.svg';
import { subtitleFormat, textFormat, titleFormat } from '../../customStyles/CustomStyles';
import { useContext, useEffect, useState } from 'react';
import CatAvatar from '../../assets/catAvatar.png';
import DogAvatar from '../../assets/dogAvatar.png';
import { CustomButtonPrimaryFilled, CustomChip, CustomChipBlank, CustomFlexedBox, CustomList } from '../../customComponents/CustomComponents';
import ShopAvatar from '../../assets/shopAvatar.png';
import ClientAvatar from '../../assets/sellerAvatar.png';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NewUserDialog from './NewUserDialog';
import { enqueueSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import nextId from "react-id-generator";

const AdminDashboardComponent = () => {

  const [orders, setOrders] = useState([]);
  const [users, setUsers]  = useState([]);
  const [isOrdersPage, setisOrdersPage] = useState(false);
  const [open, setOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const generatedId = nextId();

  const onDialogClose = (data) => {
    if(data === null){
      setDialogOpen(false)
      return
    }
    
    //Get the users array
    let users = JSON.parse(localStorage.getItem('users'));
    let pets = [];
    let orders = [];

    //Check if the array contains the email to be registered
    if(users.some(element => element.email === data.email)){
      enqueueSnackbar('The email has already been used', {variant: 'error'})
      return
    };
    
    //If the email does not exists, push the user, save the array again and refresh the info
    users.push({
      id: generatedId,
      user: data.email.split('@')[0],
      email: data.email,
      password: data.password,
      role: data.role,
      pets: pets,
      orders: orders
    });
    localStorage.setItem('users', JSON.stringify(users));
    enqueueSnackbar('Account succesfully created!', {variant: 'success'});
    setDialogOpen(false);
    retrieveInfo();
  }

  const handleClick = (id) => {
    if(open === id){
      setOpen(null)
    } else {
      setOpen(id);
    }
  };

  const handleDispatch = (userOrdering, id) => {
    // Modify the data in users
    let users = JSON.parse(localStorage.getItem('users'));
    let orderUser = users.filter(user => user.user === userOrdering);
    let target = orderUser[0].orders.find(order => order.id === id);
    let data = {...target, status: 'dispatched'};
    Object.assign(target, data)
    localStorage.setItem('users', JSON.stringify(users));

    // Modify the data in totalOrders
    let totalOrders = JSON.parse(localStorage.getItem('totalOrders'));
    let orderTarget = totalOrders.find(order => order.id === id);
    let orderData = {...orderTarget, status: 'dispatched'};
    Object.assign(orderTarget, orderData);
    localStorage.setItem('totalOrders', JSON.stringify(totalOrders))

    // Refresh info
    retrieveInfo();
  }

  const retrieveInfo = () => {
    // Get the info and set it in the states
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
              {/* Title */}
              <Grid item xs={12} display='flex' justifyContent='center' alignItems='center' sx={{marginTop: '5rem'}}>
                <Typography sx={{...titleFormat(), color: 'white', fontWeight: '600'}}>{!isOrdersPage ? 'USER LIST' : 'ORDER LIST'}</Typography>
              </Grid>

              {/* List */}
              <Grid 
                  item 
                  xs={9} 
                  height='100%' 
                  display='flex' 
                  flexDirection='column' 
                  justifyContent='center' 
                  alignItems='center'
              >
                <CustomList>
                  {/* If there are no orders */}
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
                          {/* If the user is client, show the pets label */}
                          {
                            user.role === 'client' && 
                            <CustomChipBlank size='small' variant='filled' color={user.role === 'client' ? 'secondary' : 'warning'} label={`Pets: ${user.pets.length}`} />
                          }
                          {/* If the client has no pets, do not show the expand button */}
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
                        <CustomChipBlank size='small' variant='filled' label={`${order.status.toUpperCase()}`} color={order.status === 'active' ? 'secondary' : 'success'} />
                        {/* If the order is already dispatched, do not show the dispatch button */}
                        {
                          order.status === 'active' && (
                            <ListItemIcon sx={{justifyContent: 'center'}}>
                              <Tooltip title='Dispatch' placement='top' followCursor>
                                <IconButton onClick={() => handleDispatch(order.placedBy, order.id)}>
                                  <CheckIcon />
                                </IconButton>
                              </Tooltip>
                            </ListItemIcon>
                          )
                        }
                      </ListItem>
                    ))
                  }
                </CustomList>
              </Grid>
              
              {/* Buttons */}
              <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                {
                  !isOrdersPage ? (
                    <Box>
                      <CustomButtonPrimaryFilled sx={{marginRight: '1rem'}} onClick={() => setDialogOpen(true)}>
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

            <NewUserDialog open={dialogOpen} onDialogClose={onDialogClose} />

        </Box>
      </Grid>
    </Grid>
  )
}

export default AdminDashboardComponent