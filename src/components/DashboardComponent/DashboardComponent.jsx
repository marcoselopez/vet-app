import { Grid, Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemIcon, IconButton, Tooltip, Chip } from '@mui/material';
import Peaks from '../../assets/peaks.svg';
import { subtitleFormat, textFormat, titleFormat } from '../../customStyles/CustomStyles';
import { useEffect, useState } from 'react';
import CatAvatar from '../../assets/catAvatar.png';
import DogAvatar from '../../assets/dogAvatar.png';
import { CustomButtonPrimaryFilled, CustomChip, CustomChipBlank, CustomFlexedBox, CustomList } from '../../customComponents/CustomComponents';
import { useNavigate } from 'react-router-dom';
import ShopAvatar from '../../assets/shopAvatar.png';

const DashboardComponent = () => {

  const [pets, setPets] = useState([]);
  const [orders, setOrders]  = useState([]);
  const [isOrdersPage, setisOrdersPage] = useState(false);
  const navigate = useNavigate();

  const retrieveInfo = () => {
    //Get the info and set it in the states
    let users = JSON.parse(localStorage.getItem('users'));
    let currentUser = users.filter(user => user.user === sessionStorage.username); 
    setPets(currentUser[0].pets);
    setOrders(currentUser[0].orders);
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
                <Typography sx={{...titleFormat(), color: 'white', fontWeight: '600'}}>{!isOrdersPage ? 'YOUR PETS' : 'YOUR ORDERS'}</Typography>
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
                      <Typography sx={{...subtitleFormat()}}>You have no current placed orders</Typography>
                    </CustomFlexedBox>
                  }
                  {/* If there are no pets */}
                  {!isOrdersPage && pets.length === 0 && 
                    <CustomFlexedBox sx={{flexDirection: 'row', height: '100%'}}>
                      <Typography sx={{...subtitleFormat()}}>You have no pets registered yet</Typography>
                    </CustomFlexedBox>
                  }
                  {
                    !isOrdersPage ?
                    pets.map(pet => (
                      <ListItem key={pet.id} sx={{'&:hover': {background: '#E9E9E9'}}} className='animate__animated animate__fadeInUp'>
                        <ListItemAvatar>
                          <Avatar alt='petAvatar' src={pet.type === 'dog' ? DogAvatar : CatAvatar} />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography sx={{...textFormat(), textAlign: 'left', fontWeight: '400'}}>{pet.petName}</Typography>
                        </ListItemText>
                        <CustomChip size='small' variant='filled' label={`Age: ${pet.petAge}`} />
                        <CustomChip size='small' variant='filled' label={`Weight: ${pet.petWeight}`} />
                        <CustomChip size='small' variant='filled' label={pet.isCastrated ? 'Castrated' : 'Not castrated'} />
                      </ListItem>
                    ))
                    :
                    orders.map(order => (
                      <ListItem key={order.id} sx={{'&:hover': {background: '#E9E9E9'}}} className='animate__animated animate__fadeInUp'>
                        <ListItemAvatar>
                          <Avatar alt='orderAvatar' src={ShopAvatar} />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography sx={{...textFormat(), textAlign: 'left', fontWeight: '400'}}>For {order.petName}</Typography>
                          <Typography sx={{...textFormat(), textAlign: 'left', fontWeight: '400'}}>
                            Placed on: {new Date(order.orderDate).toLocaleDateString()}
                          </Typography>
                        </ListItemText>
                        <CustomChip size='small' variant='filled' label={`Combo: ${order.orderAmount} KG`} />
                        <CustomChip size='small' variant='filled' label={`Dietary Complements: ${order.firstComplement}`} />
                        <CustomChip size='small' variant='filled' label={`Extra Dietary Complements: ${order.secondComplement}`} />
                        <CustomChipBlank size='small' variant='filled' label={`${order.status.toUpperCase()}`} color={order.status === 'active' ? 'secondary' : 'success'} />
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
                      <CustomButtonPrimaryFilled sx={{marginRight: '1rem'}} onClick={() => navigate('/register-pets')}>
                        <Typography>REGISTER MORE PETS</Typography>
                      </CustomButtonPrimaryFilled>
                      <CustomButtonPrimaryFilled onClick={() => setisOrdersPage(!isOrdersPage)}>
                        <Typography>SEE ORDERS</Typography>
                      </CustomButtonPrimaryFilled>
                    </Box>
                  ) : (
                    <Box>
                      <CustomButtonPrimaryFilled sx={{marginRight: '1rem'}} onClick={() => navigate('/products')}>
                        <Typography>PLACE MORE ORDERS</Typography>
                      </CustomButtonPrimaryFilled>
                      <CustomButtonPrimaryFilled onClick={() => setisOrdersPage(!isOrdersPage)}>
                        <Typography>SEE PETS</Typography>
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

export default DashboardComponent