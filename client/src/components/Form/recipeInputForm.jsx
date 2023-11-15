import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CreateRecipe, GET_RECIPES } from '../../utils/mutations';
import { Box, TextField, MenuItem } from '@mui/material';



const recipeForm = () => {
    const [recipeData, setRecipeData] = useState({
        name: "",
        description: "",
        image: "",
        instructions: "",
        category: [
            { name: "" }
        ],
        ingredients: [
            { name: "", amount: "" },
            { name: "", amount: "" },
            { name: "", amount: "" },
        ],
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
                name: "",
                description: "",
                image: "",
                instructions: "",
                category: [
                    { name: "" }
                ],
                ingredients: [
                    { name: "", amount: "" },
                    { name: "", amount: "" },
                    { name: "", amount: "" },
                ],
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
                    onChange={handleInputChange}
                />
            </div>
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>

            {error && <p>Error: {error.message}</p>}
        </Box>
    );
};

export default recipeForm;

