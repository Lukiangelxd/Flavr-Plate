const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Comment {
    _id: ID
    text: String!
    likes: [User]
  }

  type Ingredient{
    _id: ID
    name: String!
    amount: String!
  }

  type User {
    _id: ID
    userName: String!
    email: String!
    password: String!
    recipes: [Recipe]
    likedRecipes: [Recipe]
    comments: [Comment]
  }

  type Recipe {
    id: ID
    name: String!
    description: String!
    image: String
    instructions: String!
    author: User
    comments: [Comment]
    likes: [User]
    categories: [Category]
    ingredients: [Ingredient]
    createdAt: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    recipes(query: String): [Recipe]
    recipe(_id: ID): Recipe
    user: User
  }

  type Mutation {
    addUser(userName: String, email: String, password: String): Auth
    createRecipe(input: RecipeInput): Recipe
    likeRecipe(recipeId: ID): Recipe
    createComment(recipeId: ID, input: CommentInput): Comment
    deleteRecipe(_id: ID): String
    updateRecipe(_id: ID, input: RecipeInput): Recipe
    deleteUser: String
    login(email: String!, password: String!): Auth
  }
  
input RecipeInput {
    name: String!
    description: String!
    image: String
    instructions: String!
    categories: [CategoryInput]
    ingredients: [IngredientInput]
  }

  input CategoryInput {
    name: String!
  }

  input IngredientInput {
    name: String!
    amount: String!
  }

  input CommentInput {
    text: String!
  }
`;

module.exports = typeDefs;
