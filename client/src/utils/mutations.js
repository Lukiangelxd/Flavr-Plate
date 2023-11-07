import { gql } from '@apollo/client';

// export const LoginUser = gql`
//     mutation login($email: String!, $password: String!) {
//         login(email: $email, password: $password) {
//             token
//             user {
//                 _id
//                 username
//                 email
//             }
//         }
//     }
//     `;
export const CreateUser = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
    `;

export const CreateRecipe = gql`
    mutation addRecipe($recipeData: RecipeInput!) {
        addRecipe(recipeData: $recipeData) {
            _id
            username
            email
            savedRecipes {
                recipeId
                title
                image
                sourceUrl
            }
        }
    }
    `;
export const SaveRecipe = gql`
    mutation saveRecipe($recipeId: String!, $title: String!, $image: String!, $sourceUrl: String!) {
        saveRecipe(recipeId: $recipeId, title: $title, image: $image, sourceUrl: $sourceUrl) {
            _id
            username
            email
            savedRecipes {
                recipeId
                title
                image
                sourceUrl
            }
        }
    }
    `;
        

