import React from 'react';
import { Avatar, Typography, Paper, List, ListItemButton } from '@mui/material';

const UserProfile = ({ user, posts }) => {
  return (
    <div style={{ display: 'flex' }}>
      {/* On left, user Profile */}
      <div style={{ flex: 1 }}>
        <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* The user profile pic */}
          <Avatar alt={user.name} src={user.profilePicture} sx={{ width: 150, height: 150 }} />
          {/* Users name */}
          <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
            {user.name}
            </Typography>
        </Paper>
      </div>
      {/* Right Section: User Posts */}
      <div style={{ flex: 2, padding: '20px' }}>
        <Typography variant="h5" component="h3">
          Posts
        </Typography>
        {/* List of User Posts */}
        <List>
          {posts.map((post) => (
            <ListItemButton key={post.id}>
              {post.content}
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
};

export default UserProfile;