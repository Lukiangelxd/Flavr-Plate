import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CreateRecipe } from '../../utils/mutations';
import { Box, TextField, Button } from '@mui/material';



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
        name: event.target.value});
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
    setCategoryInput('');
  };
  const handleAddIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, ingredientInput],
    });
    setIngredientInput('');
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
                input: {...recipeData} 
            },
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
            <div>
                <TextField
                    id="outlined-name"
                    label="Name"
                    variant="outlined"
                    name="name"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    id="outlined-description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="description"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    id="outlined-image"
                    label="Image URL"
                    variant="outlined"
                    name="image"
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <TextField
                    id="outlined-instructions"
                    label="Instructions"
                    multiline
                    rows={4}
                    variant="outlined"
                    name="instructions"
                    onChange={handleInputChange}
                />
            </div>
            <div>
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
            <div>
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
              label="Ingredient amount"
              variant="outlined"
              name="amount"
              value={ingredientInput.amount}
              onChange={handleIngredientInputChange}
            />
            <Button variant="contained" color="primary" onClick={handleAddIngredient}>
              Add Ingredient
            </Button>
            </div>

            {/* Display added ingredients */}
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index}>{ingredient.name}-{ingredient.amount}</div>
            ))}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>

            {error && <p>Error: {error.message}</p>}
        </Box>
    );
};

export default RecipeForm;