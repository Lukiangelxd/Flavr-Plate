import React from 'react';
import { Container, Typography, Button, Grid, Paper } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Typography variant="h4" component="div">
              Container 1
            </Typography>
            {/* Content for Container 1 */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Typography variant="h4" component="div">
              Container 2
            </Typography>
            {/* Content for Container 2 */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Typography variant="h4" component="div">
              Container 3
            </Typography>
            {/* Content for Container 3 */}
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Typography variant="h4" component="div">
              Container 4
            </Typography>
            {/* Content for Container 4 */}
          </Paper>
        </Grid>
      </Grid>
      {/* Footer */}
      <Paper elevation={3} style={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="body2" align="center">
          Flavr-Plate &copy; 2023
        </Typography>
      </Paper>
    </Container>
  );
};

export default Home;