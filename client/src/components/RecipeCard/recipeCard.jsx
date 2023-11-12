import { Card, CardContent, CardMedia, Typography, List, ListItem, ListItemText } from '@mui/material';
import queries from '..src/utils/queries';


const RecipeCard = ({ recipe }) => {
  const { title, description, image, ingredients, instructions, author, comments } = recipe;

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <CardMedia component="img" height="200" image={image} alt={title} />

      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <List sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Ingredients:
          </Typography>
          {ingredients.map((ingredient) => (
            <ListItem key={ingredient._id}>
              <ListItemText primary={`${ingredient.name}: ${ingredient.amount}`} />
            </ListItem>
          ))}
        </List>

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Instructions:
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {instructions}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          By: {author.userName}
        </Typography>

        <List sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Comments:
          </Typography>
          {comments.map((comment) => (
            <ListItem key={comment._id}>
              <ListItemText primary={`${comment.user.userName}: ${comment.text}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;


