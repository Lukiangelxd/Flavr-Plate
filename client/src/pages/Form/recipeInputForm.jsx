import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CreateRecipe } from '../../utils/mutations';
import { Box, TextField, Button, Grid } from '@mui/material';

const RecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    name: "",
    description: "",
    image: "",
    instructions: "",
    categories: [],
    ingredients: [],
  });

  const [categoryInput, setCategoryInput] = useState({
    name: ''
  });

  const [ingredientInput, setIngredientInput] = useState({
    name: '',
    amount: ''
  });

  const handleCategoryInputChange = (event) => {
    setCategoryInput({
      ...categoryInput,
      name: event.target.value
    });
  };

  const handleIngredientInputChange = (event) => {
    setIngredientInput({
      ...ingredientInput,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddCategory = () => {
    setRecipeData({
      ...recipeData,
      categories: [...recipeData.categories, categoryInput],
    });
    setCategoryInput({ name: '' }); // Clear the category input
  };

  const handleAddIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, ingredientInput],
    });
    setIngredientInput({ name: '', amount: '' }); // Clear the ingredient input
  };

  const [addRecipe, { error, data }] = useMutation(CreateRecipe);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addRecipe({
        variables: {
          input: { ...recipeData },
        },
      });
      // The form inputs will be cleared in the useEffect hook when data changes
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // This effect will run when the mutation's data changes
    if (data) {
      setRecipeData({
        name: "",
        description: "",
        image: "",
        instructions: "",
        categories: [],
        ingredients: [],
      });
      setCategoryInput({ name: '' });
      setIngredientInput({ name: '', amount: '' });
    }
  }, [data]); // Only run the effect when data changes


  return (
    <Box 
    as ="span"
    sx = {{
      marginTop: '20px',
    }}>
      {/* Header */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Box
          as="span"
          sx={{
            textAlign: 'center',
            fontFamily: 'Segoe Script',
            fontSize: { xs: '24px', md: '32px' }, // Responsive font size
            fontWeight: 'bold',
            marginTop: '20px', // Add margin to the top
            marginBottom: '20px', // Add margin to the bottom
            cursor: 'pointer',
            color: '#D8A79D', // Set the desired color
            textDecoration: 'none', // Remove underline
          }}
        >
          Flavr Plate's Recipe Creator
        </Box>
      </Link>

      {/* The Main Recipe Form */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: { xs: '90%', sm: '80%', md: '70%' }, // Responsive max width
          margin: 'auto',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.3)',
          '& .MuiTextField-root': {
            margin: '8px 0',
            width: '100%',
          },
          '& .MuiButton-root': {
            margin: '16px 0',
            ...buttonStyles,
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <Box
          sx={{
            marginBottom: '20px',
            fontSize: { xs: '18px', md: '25px' }, // Responsive font size
            fontWeight: 'bold',
          }}
        >
          <p>
            Welcome to the Recipe Form! Please follow the instructions below to add your recipe. Recipes are organized by category for easy searching.
          </p>
        </Box>

        <Grid container spacing={2}>
          {/* First Column */}
          <Grid item xs={12} sm={4}>
            <div>
              <TextField
                id="outlined-name"
                label="Name"
                variant="outlined"
                name="name"
                value={recipeData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-description"
                label="Simple Description"
                multiline
                rows={6}
                variant="outlined"
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-image"
                label="Insert URL for Image"
                variant="outlined"
                name="image"
                value={recipeData.image}
                onChange={handleInputChange}
              />
            </div>
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} sm={4}>
            <div>
              <TextField
                id="outlined-instructions"
                label="Add Instructions"
                multiline
                rows={12}
                variant="outlined"
                name="instructions"
                value={recipeData.instructions}
                onChange={handleInputChange}
              />
            </div>
          </Grid>

          {/* Third Column */}
          <Grid item xs={12} sm={4}>
            <div style={{ textAlign: 'center' }}>
              <TextField
                id="outlined-custom-category"
                label="Custom Category"
                variant="outlined"
                name="category"
                value={categoryInput.name}
                onChange={handleCategoryInputChange}
              />
              <Button variant="contained" color="primary" onClick={handleAddCategory}>
                Add Category
              </Button>
            </div>
            {recipeData.categories.map((category, index) => (
              <div key={index}>{category.name}</div>
            ))}
            <div style={{ textAlign: 'center' }}>
              <TextField
                id="outlined-custom-ingredient-name"
                label="Ingredient name"
                variant="outlined"
                name="name"
                value={ingredientInput.name}
                onChange={handleIngredientInputChange}
              />
              <TextField
                id="outlined-custom-ingredient-amount"
                label="Amount of Ingredient"
                variant="outlined"
                name="amount"
                value={ingredientInput.amount}
                onChange={handleIngredientInputChange}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </Button>
            </div>

            {/* Display added ingredients */}
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index}>
                {ingredient.name}-{ingredient.amount}
              </div>
            ))}
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={buttonStyles}>
          Submit Your Creation!
        </Button>

        {error && <p>Error: {error.message}</p>}
      </Box>
    </Box>
  );
};

const buttonStyles = {
  fontFamily: 'Segoe UI, sans-serif',
  '&:hover': {
    backgroundColor: '#F7D1C3',
    transition: '0.3s',
    transform: 'scale(1.05)',
  },
  '&:active': {
    backgroundColor: '#C48172',
    transform: 'scale(0.95)',
  },
};

export default RecipeForm;