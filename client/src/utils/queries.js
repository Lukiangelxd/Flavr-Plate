import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
  query getRecipes {
    recipes {
      _id
      title
      description
      image
      ingredients {
        _id
        name
        amount
      }
      instructions
      category {
        _id
        name
      }
      author {
        _id
        username
      }
      createdAt
      comments {
        _id
        text
        user {
          _id
          username  # Include the relevant user information
        }
      }
      likes {
        _id
      }
    }
  }
`;

export const GET_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      title
      description
      image
      ingredients {
        _id
        name
        amount
      }
      instructions
      category {
        _id
        name
      }
      author {
        _id
        username
      }
      createdAt
      comments {
        _id
        text
        user {
          _id
          username  # Include the relevant user information
        }
      }
      likes {
        _id
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      name
    }
  }
`;


export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        name
        image
        description
        instructions
        comments {
          _id
          text
          user {
            _id
            username  # Include the relevant user information
          }
        }
      }
      likes {
          _id
          name
          image
          description
      }
      createdAt
      }
    }
  }
`;
