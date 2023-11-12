import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, TextField, Box } from '@mui/material';
import { CreateRecipe } from '../../utils/mutations';

import Auth from '../../utils/auth';

const AddRecipe = () => {

    const [recipe, setRecipe] = useState({
        recipeName: '',
        recipeDescription: '',
        recipeIngredients: '',
        recipeInstructions: '',
        recipeCategory: '',
        recipeImage: '',
    });

    const [newRecipe, { error, data }] = useMutation(CreateRecipe);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await newRecipe({
                variables: { ...recipe },
            });

            setRecipe({
                recipeName: '',
                recipeDescription: '',
                recipeIngredients: '',
                recipeInstructions: '',
                recipeCategory: '',
                recipeImage: '',
            });
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div>
            <h4>Let's get cooking!</h4>

            {Auth.loggedIn() ? (
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >

                    <div className="col-12 col-lg-3">
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Recipe Name"
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setRecipe({ ...recipe, recipeName: event.target.value })}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Recipe Description"
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setRecipe({ ...recipe, recipeDescription: event.target.value })}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Recipe Ingredients"
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setRecipe({ ...recipe, recipeIngredients: event.target.value })}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Recipe Instructions"
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setRecipe({ ...recipe, recipeInstructions: event.target.value })}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Recipe Category"
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setRecipe({ ...recipe, recipeCategory: event.target.value })}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Recipe Image"
                                    multiline
                                    maxRows={4}
                                    onChange={(event) => setRecipe({ ...recipe, recipeImage: event.target.value })}
                                />
                            </div>
                            <Button variant="contained" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </div>
                </form>
            ) : (
                <p>
                    You need to be logged in to share your recipe. Please{' '}
                    <a href="/login">login</a> or <a href="/signup">signup.</a>
                </p>
            )}
        </div>
    )

}

export default AddRecipe;
