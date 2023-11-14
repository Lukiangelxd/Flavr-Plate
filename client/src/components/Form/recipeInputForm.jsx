import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CreateRecipe, GET_RECIPES } from './utils/mutations';
import {Box, TextField, MenuItem} from '@mui/material';



const recipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    image: '',
    instructions: '',
    category: '', 
  });

  const [addRecipe, { error }] = useMutation(CreateRecipe);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      
      await addRecipe({
        variables: { recipeData },
        refetchQueries: [{ query: GET_RECIPES }],
      });

      
      setRecipeData({
        name: '',
        description: '',
        image: '',
        instructions: '',
        category: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <TextField
        id="outlined-name"
        label="Name"
        variant="outlined"
        name="name"
        value={recipeData.name}
        onChange={handleInputChange}
      />

      <TextField
        id="outlined-description"
        label="Description"
        multiline
        rows={4}
        variant="outlined"
        name="description"
        value={recipeData.description}
        onChange={handleInputChange}
      />

      <TextField
        id="outlined-image"
        label="Image URL"
        variant="outlined"
        name="image"
        value={recipeData.image}
        onChange={handleInputChange}
      />

      <TextField
        id="outlined-instructions"
        label="Instructions"
        multiline
        rows={4}
        variant="outlined"
        name="instructions"
        value={recipeData.instructions}
        onChange={handleInputChange}
      />

      <TextField
        id="outlined-select-category"
        select
        label="Select Category"
        variant="outlined"
        name="category"
        value={recipeData.category}
        onChange={handleInputChange}
      >
        
        <MenuItem value="breakfast">breakfast</MenuItem>
        <MenuItem value="lunch">lunch</MenuItem>
        <MenuItem value="dinner">dinner</MenuItem>
      </TextField>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>

      {error && <p>Error: {error.message}</p>}
    </Box>
  );
};

export default recipeForm;

