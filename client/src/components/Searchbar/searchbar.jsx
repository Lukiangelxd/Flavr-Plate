import React, { useState } from 'react';
import {Button, Box, TextField} from '@mui/material';
import { GET_RECIPES } from '../../utils/queries.js';
import { useQuery } from '@apollo/client';   


const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState('');
  
    const handleInputChange = (event) => {
      setSearch(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(search);

      const { data, loading, error } = useQuery( GET_RECIPES, {
        variables : search
      });

      if (loading) {
        console.log('Loading...');
      }
      if (error) {
        console.error('Error', error);
      }
      if (data) {
        console.log('Recipes:', data.recipes);
      }
    };
  
    return (
      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="text"
          label="Search"
          placeholder="Search and ingredient or recipe name"
          value={search}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          sx={{
            color: (theme) => theme.palette.getContrastText(theme.palette.primary.main),
            backgroundColor: 'purple', // Use 'purple' directly instead of purple[500]
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'purple', // Use 'purple' directly instead of purple[700]
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
    );
  };
  
  export default SearchBar;