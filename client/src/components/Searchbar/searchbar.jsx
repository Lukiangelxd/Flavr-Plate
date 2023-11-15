import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { GET_RECIPES } from '../../utils/queries';
import { createTheme, ThemeProvider } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearchResult }) => {
  const [search, setSearch] = useState({ query: '' });

  const handleInputChange = (event) => {
    setSearch({ ...search, query: event.target.value });
  };

  const [findRecipes, { data, loading, error }] = useLazyQuery(GET_RECIPES);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      console.log(search);
      console.log(search.query);
      const result = await findRecipes({
        variables: { query: search.query },
      });
      if (loading) {
        console.log('Loading...');
      }
      if (result) {
        console.log('Recipes:', result);
        onSearchResult(result.data.recipes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <form noValidate autoComplete="off" onSubmit={handleSearch}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <label htmlFor="search" style={{ marginRight: '8px' }}>
              Search:
            </label>
          </Grid>
          <Grid item>
            <TextField
              id="search"
              type="text"
              placeholder="Search an ingredient or recipe name"
              value={search.query}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#4CAF50',
                fontFamily: 'Segoe UI, sans-serif',
                '&:hover': {
                  backgroundColor: '#F7D1C3',
                  transition: '0.5s',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  backgroundColor: '#C48172',
                  transform: 'scale(0.95)',
                },
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </ThemeProvider>
  );
};

SearchBar.propTypes = {
  onSearchResult: PropTypes.func.isRequired,
};

export default SearchBar;
