import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import { SEARCH_RECIPES } from './PATH;
//import { useMutation } from '@apollo/client';   
import { purple } from '@mui/material/colors';

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState('');
  
    const handleInputChange = (event) => {
      setSearch(event.target.value);
    };
  
    const handleSearch = () => {
      onSearch(search);
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
            color: (theme) => theme.palette.getContrastText(purple[500]),
            backgroundColor: purple[500],
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: purple[700],
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