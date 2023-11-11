import { useState, useEffect } from 'react';
import {useQuery} from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USER } from '../utils/queries';
import {Typography, Paper, List, ListItemButton } from '@mui/material';
import Auth from '../utils/auth';


const UserProfile = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const [userData, setUserData] = useState({});
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { token },
    skip: !token, 
  });
  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);
  return (
    <div style={{ display: 'flex' }}>
      {/* On left, user Profile */}
      <div style={{ flex: 1 }}>
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Users name */}
          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
            {userData.username}
          </Typography>
        </Paper>
      </div>
      {/* Right Section: User Posts */}
      <div style={{ flex: 2, padding: '20px' }}>
        <Typography variant="h5" component="h3">
          All Recipes
        </Typography>
        {/* List of User Recipes */}
        <List>
          {userData.recipes.map((recipe) => (
            <ListItemButton key={recipe._id}>
              <div>
                <Typography variant="h6" component="div">
                  <Link to={`/${recipe._id}`}>{recipe.name}</Link>
                </Typography>
                <p>{recipe.description}</p>
                 {/* Display recipe image, may need to change if changing list  */}
                 {recipe.image && (
                  <img src={recipe.image} alt={recipe.name} style={{ maxWidth: '100%', height: 'auto' }} />
                )}
                {/* Display recipe comments if available */}
                {recipe.comments.map((comment) => (
                  <div key={comment._id}>
                    <p>Comment by {comment.user.username}: {comment.text}</p>
                  </div>
          ))}
          </div>
          </ListItemButton>
          ))}
        </List>
        {/* Liked Posts */}
      <div style={{ flex: 2, padding: '20px' }}>
           <Typography variant="h5" component="h3">
             Liked Posts
          </Typography>
        <List>
         {userData.likes.map((likedRecipe) => (
          <ListItemButton key={likedRecipe._id}>
           <div>
            <Typography variant="h6" component="div">
            <Link to={`/${likedRecipe._id}`}>{likedRecipe.name}</Link>
            </Typography>
            <p>{likedRecipe.description}</p>
          {/* Display liked recipe image */}
           {likedRecipe.image && (
             <img src={likedRecipe.image} alt={likedRecipe.name} style={{ maxWidth: '100%', height: 'auto' }} />
          )}
            </div>
          </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  </div>
  );
};

export default UserProfile;