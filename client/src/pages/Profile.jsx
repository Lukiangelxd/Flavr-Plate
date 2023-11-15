import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import Header from '../components/Header/Header';
import { Link } from 'react-router-dom';
import { GET_USER } from '../utils/queries';
import {
  Typography,
  Paper,
  List,
  ListItemButton,
  Divider,
  Grid,
} from '@mui/material';
import Auth from '../utils/auth';

const UserProfile = () => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const [userData, setUserData] = useState({});
  const { data, loading, error } = useQuery(GET_USER, {
    skip: !token,
  });

  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data, userData]);

  return ( 
    <>
      <Header />
      {userData && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* User Info Section (Centered) */}
          <Paper
            elevation={3}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '20px',
            }}
          >
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {userData.userName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData.email}
            </Typography>
          </Paper>

          {/* User Posts Section (Left) */}
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div style={{ flex: 1, backgroundColor: 'red', padding: '20px' }}>
              <Typography variant="h5" component="h3" sx={{ color: 'white' }}>
                User Posts
              </Typography>
              <List>
                {userData.recipes &&
                  userData.recipes.map((recipe) => (
                    <React.Fragment key={recipe._id}>
                      <ListItemButton>
                        <div>
                          <Typography variant="h6" component="div">
                            <Link to={`/${recipe._id}`}>{recipe.name}</Link>
                          </Typography>
                          <p>{recipe.description}</p>
                          {recipe.image && (
                            <img
                              src={recipe.image}
                              alt={recipe.name}
                              style={{ maxWidth: '100%', height: 'auto' }}
                            />
                          )}
                          {recipe.comments &&
                            recipe.comments.map((comment) => (
                              <div key={comment._id}>
                                <p>
                                  Comment by {comment.user.userName}:{' '}
                                  {comment.text}
                                </p>
                              </div>
                            ))}
                        </div>
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  ))}
              </List>
            </div>

            {/* Liked Posts Section (Right) */}
            <div style={{ flex: 1, backgroundColor: 'green', padding: '20px' }}>
              <Typography variant="h5" component="h3" sx={{ color: 'white' }}>
                Liked Posts
              </Typography>
              <List>
                {userData.likedRecipes &&
                  userData.likedRecipes.map((likedRecipe) => (
                    <React.Fragment key={likedRecipe._id}>
                      <ListItemButton>
                        <div>
                          <Typography variant="h6" component="div">
                            <Link to={`/${likedRecipe._id}`}>
                              {likedRecipe.name}
                            </Link>
                          </Typography>
                          <p>{likedRecipe.description}</p>
                          {likedRecipe.image && (
                            <img
                              src={likedRecipe.image}
                              alt={likedRecipe.name}
                              style={{ maxWidth: '100%', height: 'auto' }}
                            />
                          )}
                        </div>
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  ))}
              </List>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
