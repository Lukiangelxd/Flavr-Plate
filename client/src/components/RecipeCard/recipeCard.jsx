import  { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { AddComment, LikeRecipe } from '../../utils/mutations';
import { Card, CardContent, CardMedia, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => {
  const { _id, name, description, image, ingredients, instructions, author, comments, likes } = recipe;

  // Likes
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeRecipe] = useMutation(LikeRecipe);

  const handleLike = async () => {
    try {
      // Call the LikeRecipe mutation to update likes in the database
      await likeRecipe({ variables: { recipeId: _id } });
  
      // Update the like count in the component state immediately
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  // Comments
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState(comments);
  const [addComment] = useMutation(AddComment);

  const handleComment = async () => {
    if (commentText.trim() !== '') {
      try {
        // Call the AddComment mutation to add a new comment to the database
        const { data } = await addComment({
          variables: { recipeId: _id, input: { text: commentText } },
        });
  
        // Update the comment list in the component state immediately with the newly added comment
        const newComment = {
          _id: data.createComment._id,
          author: { userName: data.createComment.author.userName },
          text: data.createComment.text,
        };
  
        setCommentList([...commentList, newComment]);
        setCommentText('');
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };
  useEffect(() => {
    setLikeCount(likes.length);
  }, [likes]);
  useEffect(() => {
    setCommentList(comments);
  }, [comments]);
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
              <ListItemText primary={`${comment.author.userName}: ${comment.text}`} />
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
    _id: PropTypes.string.isRequired,
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