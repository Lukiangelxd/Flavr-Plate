import { gql } from '@apollo/client';

export const GET_RECIPES = gql`
  query getRecipes($query: String!) {
    recipes(query: $query) {
      _id
      name
      description
      image
      ingredients {
        _id
        name
        amount
      }
      instructions
      categories {
        _id
        name
      }
      author {
        _id
        userName
      }
      createdAt
      comments {
        _id
        text
        author {
          _id
          userName  
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
      name
      description
      image
      ingredients {
        _id
        name
        amount
      }
      instructions
      categories {
        _id
        name
      }
      author {
        _id
        userName
      }
      createdAt
      comments {
        _id
        text
        author {
          _id
          userName  
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
  query getUser {
    user {
      _id
      userName
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
          author {
            _id
            userName  
          }
        }
      }
      likedRecipes {
          _id
          name
          image
          description
      }
      }
    }
`;
