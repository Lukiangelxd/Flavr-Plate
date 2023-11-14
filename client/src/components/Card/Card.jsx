import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Card.css';

const cardContainerStyle = {
  width: '200px', // You can adjust the width as needed
  height: '100%', // You can adjust the height as needed
  margin: '0 10px', // Add some margin between cards
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
    transform: 'scale(2.0)',
  },
};

export default function BasicCard() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* First Card */}
      <Card className="card1" sx={cardContainerStyle}>
        <Card sx={cardStyle}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              be 
              {/* add some text here */}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Card>
    </Box>
  );
}
