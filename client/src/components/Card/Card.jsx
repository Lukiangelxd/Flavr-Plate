import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { GET_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const cardContainerStyle = {
  width: '200px',
  height: '100%',
  margin: '0 10px',
};

const cardStyle = {
  mt: 3,
  mb: 2,
  backgroundColor: 'white',
  fontFamily: 'Segoe UI, sans-serif',
  '&:hover': {
    backgroundColor: 'white',
    transition: '0.1s',
    transform: 'scale(1.05)',
  },
  '&:active': {
    backgroundColor: 'white',
    transform: 'scale(1.0)',
  },
};

const BasicCard = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      const categories = data?.categories.slice(0, 4) || [];
      console.log('Categories:', categories);
      setCardData(categories);
    }
  }, [data]);

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {cardData.map((category) => (
        <Card key={category._id} className='card2' sx={cardContainerStyle}>
          <Card sx={cardStyle}>
            <CardContent>
              <Typography variant='h5' component='div'>
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        </Card>
      ))}
    </Box>
  );
};

export default BasicCard;