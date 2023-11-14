import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CreateRecipe, GET_RECIPES } from './utils/mutations';

const recipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    image: '',
    instructions: '',
    category: '', //fetch categories and populate dropdown
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
    <form onSubmit={handleFormSubmit}>
      
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={recipeData.name}
        onChange={handleInputChange}
      />
       <label>Description:</label>
      <textarea
        name="description"
        value={recipeData.description}
        onChange={handleInputChange}
      />
      <label>Image URL:</label>
      <input
        type="text"
        name="image"
        value={recipeData.image}
        onChange={handleInputChange}
      />
      <label>Instructions:</label>
      <textarea
        name="instructions"
        value={recipeData.instructions}
        onChange={handleInputChange}
      />
      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={recipeData.category}
        onChange={handleInputChange}
      />

      <button type="submit">Submit</button>

      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default recipeForm;

