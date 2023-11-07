import { gql } from '@apollo/client';


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

export const DeleteUser = gql`
    mutation deleteUser($userId: String!) {
        deleteUser(userId: $userId) {
            _id
            username
            email
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
                name
                image
                sourceUrl
            }
        }
    }
    `;

export const DeleteRecipe = gql`
    mutation deleteRecipe($recipeId: String!) {
        deleteRecipe(recipeId: $recipeId) {
            _id
            username
            email
            savedRecipes {
                recipeId
                name
                image
                sourceUrl
            }
        }
    }
    `;


export const AddComment = gql`
    mutation addComment($recipeId: String!, $commentText: String!) {
        addComment(recipeId: $recipeId, commentText: $commentText) {
            _id
            username
            email
            savedRecipes {
                recipeId
                name
                image
                sourceUrl
                comments {
                    commentText
                }
            }
        }
    }
    `;
// 
export const LikeRecipe = gql`
    mutation likeRecipe($recipeId: String!) {
        likeRecipe(recipeId: $recipeId) {
            _id
            username
            email
            savedRecipes {
                recipeId
                name
                image
                sourceUrl
                likes
            }
        }
    }
    `;


