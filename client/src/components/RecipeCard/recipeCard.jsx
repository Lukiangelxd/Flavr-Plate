import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => {
  const { name, description, image, ingredients, instructions, author, comments, likes } = recipe;

  // Likes
  const [likeCount, setLikeCount] = useState(likes.length);

  // Comments
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const handleLike = () => {
    // (Like mutation): update likes, increment the like count
    setLikeCount(likeCount + 1);
  };

  const handleComment = () => {
    if (commentText.trim() !== '') {
      // (Comment mutation) update the comment list
      const newComment = {
        _id: 'newCommentId',
        user: { userName: 'CurrentUser' },
        text: commentText,
      };

      setCommentList([...commentList, newComment]);
      setCommentText('');
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
      <CardMedia component="img" height="auto" image={image} alt={name} />

      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
          {name}
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

        {/* Like Section */}
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          Likes: {likeCount}
        </Typography>
        <Button variant="outlined" onClick={handleLike}>
          Like
        </Button>

        {/* Comments Section */}
        <List sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Comments:
          </Typography>
          {commentList.map((comment) => (
            <ListItem key={comment._id}>
              <ListItemText primary={`${comment.user.userName}: ${comment.text}`} />
            </ListItem>
          ))}
        </List>
        <div>
          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="outlined" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
      })
    ).isRequired,
    instructions: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userName: PropTypes.string.isRequired,
    }).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        author: PropTypes.shape({
          userName: PropTypes.string.isRequired,
        }).isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
    likes: PropTypes.arrayOf(
      PropTypes.shape(
        {
          _id: PropTypes.string.isRequired
        }
      )
    )
  }).isRequired,
};

export default RecipeCard;