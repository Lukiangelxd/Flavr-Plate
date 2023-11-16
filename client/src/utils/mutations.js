import { gql } from '@apollo/client';


export const CreateUser = gql`
    mutation addUser($userName: String!, $email: String!, $password: String!) {
        addUser(userName: $userName, email: $email, password: $password) {
            token
            user {
                _id
                userName
                email
            }
        }
    }
    `;

export const DeleteUser = gql`
    mutation deleteUser($userId: String!) {
        deleteUser(userId: $userId) {
            _id
            userName
            email
        }
    }
    `;

export const CreateRecipe = gql`
    mutation createRecipe($input: RecipeInput!) {
      createRecipe(input: $input) {
        _id
        name
        description
        image
        instructions
        categories {
          name
        }
        ingredients {
          name
          amount
        }
      }
    }
  `;

export const DeleteRecipe = gql`
    mutation deleteRecipe($recipeId: String!) {
        deleteRecipe(recipeId: $recipeId) {
            _id
            userName
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
    mutation createComment($recipeId: ID!, $input: CommentInput!) {
        createComment(recipeId: $recipeId, input: $input) {
          _id
         text
         author {
          userName
       }
    }
  }
    `;
// 
export const LikeRecipe = gql`
    mutation likeRecipe($recipeId: ID!) {
        likeRecipe(recipeId: $recipeId) {
            _id
            name
            likes {
                _id
            }
        }
    }
    `;
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
export const UpdateRecipe = gql`
  mutation updateRecipe($recipeId: ID!, $input: RecipeInput!) {
    updateRecipe(_id: $recipeId, input: $input) {
      id
      name
      description
      image
      instructions
      author {
        _id
        userName
        email
      }
      comments {
        _id
        text
      }
      likes {
        _id
        userName
        email
      }
      categories {
        _id
        name
      }
      ingredients {
        _id
        name
        amount
      }
      createdAt
    }
  }
`;

