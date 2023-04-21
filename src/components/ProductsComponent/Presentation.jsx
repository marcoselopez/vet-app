import { Grid, Box, Typography, CardContent, CardMedia} from '@mui/material';
import { subtitleFormat, textFormat, titleFormat } from '../../customStyles/CustomStyles';
import { CustomCard } from '../../customComponents/CustomComponents';
import DogFoodImage from '../../assets/dog-food.png';
import CatFoodImage from '../../assets/cat-food.png';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Presentation = () => {

  const navigate = useNavigate();
  const [_, setSelectedCombo] = useOutletContext();

  return (
    <Grid container gap={2} textAlign='center' sx={{padding: '25px 0'}} justifyContent='center' alignItems='center' className='animate__animated animate__fadeIn' >
      <Grid item xs={12}>
        <Typography sx={{...titleFormat(), color: 'white'}} className='animate__animated animate__fadeInUp'>
          Introducing our new line of pet food combos!
        </Typography>
        <Typography sx={{...subtitleFormat(), color: 'white'}} className='animate__animated animate__fadeInUp'>
          Made with high-quality ingredients and tailored to meet the nutritional needs of your furry friends
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography sx={{...titleFormat(), color: 'white', fontSize: '2.5rem'}} className='animate__animated animate__tada animate__delay-1s'>
          Try them out!
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{marginTop: '1rem', marginRight: '1rem'}}>
        <CustomCard onClick={() => {setSelectedCombo('dog'); navigate('/products/ordering')}}>
          <CardMedia
            sx={{width: '30%', marginTop: '1rem'}}
            component="img"
            image={DogFoodImage}
            alt="DogFoodImage"
          />
          <CardContent>
            <Typography sx={{...subtitleFormat(), fontSize: '1.2rem', fontWeight: '600', color: '#38AA95'}}>
              DOGGO COMBO
            </Typography>
            <Typography sx={{...subtitleFormat(), fontSize: '4rem', fontWeight: '600', color: '#38AA95'}}>
              $120
            </Typography>
            <Box display='flex' flexDirection='column' alignItems='flex-start'>
              <Typography sx={{...textFormat(), fontWeight: '500'}}>
                <TaskAltIcon sx={{marginRight: '10px'}} />
                Your pooch happy and healthy!
              </Typography>
              <Typography sx={{...textFormat(), fontWeight: '500'}}>
                <TaskAltIcon sx={{marginRight: '10px'}} />
                High-quality ingredients!
              </Typography>
            </Box>
          </CardContent>
        </CustomCard>
      </Grid>
      <Grid item xs={3} marginTop='1rem'>
        <CustomCard onClick={() => {setSelectedCombo('cat'); navigate('/products/ordering')}}>
          <CardMedia
            sx={{width: '30%', marginTop: '1rem'}}
            component="img"
            image={CatFoodImage}
            alt="DogFoodImage"
          />             
          <CardContent>
            <Typography sx={{...subtitleFormat(), fontSize: '1.2rem', fontWeight: '600', color: '#38AA95'}}>
              KITTY COMBO
            </Typography>
            <Typography sx={{...subtitleFormat(), fontSize: '4rem', fontWeight: '600', color: '#38AA95'}}>
              $120
            </Typography>
            <Box display='flex' flexDirection='column' alignItems='flex-start'>
              <Typography sx={{...textFormat(), fontWeight: '500'}}>
                <TaskAltIcon sx={{marginRight: '10px'}} />Purrfectly delicious
              </Typography>
              <Typography sx={{...textFormat(), fontWeight: '500'}}>
                <TaskAltIcon sx={{marginRight: '10px'}} />
                Specially formulated!
              </Typography>
            </Box>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  )
}

export default Presentation