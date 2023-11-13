import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Card.css';

export default function BasicCard() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      {/* First Card */}
      <Card className="card1">
      <Card sx={{ minWidth: 130 }}>
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
      {/* Second Card */}
      <Card sx={{ minWidth: 120 }}>
      <Card className="card2">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Another Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            example
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            noun
          </Typography>
          <Typography variant="body2">
            a representative form or pattern.
            <br />
            {'"an example of good design"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      </Card>

      {/* Third Card */}
      <Card sx={{ minWidth: 120 }}>
      <Card className="card3">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Another Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            example
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            noun
          </Typography>
          <Typography variant="body2">
            a representative form or pattern.
            <br />
            {'"an example of good design"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      </Card>

      {/* Fourth Card */}
      <Card className="card4">
      <Card sx={{ minWidth: 120 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Another Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            example
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            noun
          </Typography>
          <Typography variant="body2">
            a representative form or pattern.
            <br />
            {'"an example of good design"'}
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
