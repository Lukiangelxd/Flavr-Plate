import React from 'react';
import {useQuery} from '@apollo/client';
import { GET_USER } from '../utils/queries';
import {Typography, Paper, List, ListItemButton } from '@mui/material';


const UserProfile = ({ username }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { username },
  });

  const user = data?.user || {};
// List of func, follow links to other posts. Name of liked posts (key=recipe.id), on-click (will need a component [recipe_card]).

  return (
    <div style={{ display: 'flex' }}>
      {/* On left, user Profile */}
      <div style={{ flex: 1 }}>
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Users name */}
          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
            {user.username}
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
          {user.recipes.map((recipe) => (
            <ListItemButton key={recipe._id}>
              <div>
                <Typography variant="h6" component="div">
                  {recipe.name}
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
      </div>
    </div>
  );
};

export default UserProfile;