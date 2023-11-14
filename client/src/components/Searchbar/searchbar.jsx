import React, { useState } from 'react';
import {Button, Box, TextField} from '@mui/material';
import { GET_RECIPES } from '../../utils/queries';
import { createTheme, ThemeProvider } from '@mui/material';
import { useLazyQuery } from '@apollo/client';



const SearchBar = () => {
  
    const [search, setSearch] = useState({ query: ''});
  
    const handleInputChange = (event) => {
      setSearch({ ...search, query: event.target.value });
    };
    
    const [findRecipes, { data, loading, error }] = useLazyQuery(GET_RECIPES)

    const handleSearch = async(event) => {
      event.preventDefault();
      try {
        console.log(search)
        console.log(search.query)
        const result = await findRecipes({
          variables:  { query: search.query } 
        });
        if (loading) {
          console.log('Loading...');
        }
        if (result) {
          console.log('Recipes:', result);
        }
        
      } catch (error) {
        console.error(error);
      }
      
    };
    const defaultTheme = createTheme();
    return (
      <ThemeProvider theme={defaultTheme}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSearch}
      >
        <TextField
          type="text"
          label="Search"
          placeholder="Search and ingredient or recipe name"
          value={search.query}
          onChange={handleInputChange}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
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
      </Box>
      </ThemeProvider>
    );
  };
  
  export default SearchBar;