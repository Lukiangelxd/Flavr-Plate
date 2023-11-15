const { Category, Comment, User, Recipe, Ingredient} = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        recipes: async (parent, { query }) => {
          if (!query) {
            // If no query is provided, return all recipes
            const recipes = await Recipe.find().populate('categories').populate('ingredients');
            return recipes;
          }
        
          const regexQuery = { $regex: query, $options: 'i' };
        
          // Search for categories with matching names
          const matchingCategories = await Category.find({ name: regexQuery });
        
          // Search for ingredients with matching names
          const matchingIngredients = await Ingredient.find({ name: regexQuery });
        
          // Get the IDs of matching categories and ingredients
          const categoryIds = matchingCategories.map(category => category._id);
          const ingredientIds = matchingIngredients.map(ingredient => ingredient._id);
        
          // Search for recipes based on name, ingredient name, or category name
          const recipes = await Recipe.find({
            $or: [
              { name: regexQuery }, // Recipe name search
              { 'ingredients.name': regexQuery }, // Ingredient name search
              { 'categories.name': regexQuery }, // Category name search
              { 'ingredients': { $in: ingredientIds } }, // Recipes with matching ingredients
              { 'categories': { $in: categoryIds } }, // Recipes with matching categories
            ],
          }).populate('categories').populate('ingredients').populate('author').populate({
            path: 'comments',
            populate: {
              path: 'author',
              model: 'User', 
            },
          })
        
          return recipes;
        },
        recipe: async (parent, {_id}) => {
            return await Recipe.findById(_id).populate(['categories', 'ingredients', 'comments']);
        },
        user: async (parent, args, context) => {
          if (context.user) {
            try {
              const user = await User.findById(context.user._id)
                .populate({
                  path: 'recipes',
                  model: 'Recipe',
                  populate: {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                      path: 'author',
                      model: 'User',
                    },
                  },
                })
                .populate('likedRecipes');
        
              return user;
            } catch (error) {
              console.error(error);
              throw new Error('Error fetching user data');
            }
          }
          throw new Error('User not authenticated');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
        },
        createRecipe: async (parent, { input }, context) => {
            const { user } = context;
            console.log('Input:', input);
          
            if (!user) {
              throw new AuthenticationError('You must be logged in to create a recipe.');
            }
          
            try {
              const { name, description, image, instructions, categories, ingredients } = input;
              
              // Create an array to store the category IDs
              const categoryIds = [];
              for (const categoryData of categories) {
                const obj = { ...categoryData }
                console.log(categoryData)
                console.log(obj)
                const existingCategory = await Category.findOne({ name: obj.name });
                console.log(existingCategory)
                if (existingCategory) {
                  categoryIds.push(existingCategory._id);
                } else {
                  // Create a new category if it doesn't exist
                  const newCategory = await Category.create({ name: obj.name });
                  console.log("New category")
                  console.log(newCategory)
                  categoryIds.push(newCategory._id);
                }
              }
          
              // Create an array to store the ingredient IDs
              const ingredientIds = [];
              for (const ingredientData of ingredients) {
                console.log(ingredientData)
                const obj = { ...ingredientData }
                console.log(obj)
                const existingIngredient = await Ingredient.findOne({ name: obj.name });
          
                if (existingIngredient) {
                  ingredientIds.push(existingIngredient._id);
                } else {
                  // Create a new ingredient if it doesn't exist
                  const newIngredient = await Ingredient.create({ name: obj.name,
                  amount: ingredientData.amount });
                  console.log(newIngredient)
                  ingredientIds.push(newIngredient._id);
                }
              }
          
              // Create the Recipe document and associate it with categories and ingredients
              const recipe = await Recipe.create({
                name,
                description,
                image,
                instructions,
                author: user._id,
                categories: categoryIds,
                ingredients: ingredientIds,
              });
              console.log('Output:', recipe);
              const toReturn = await Recipe.findOne({_id: recipe._id}).populate(['categories', 'ingredients'])
              return toReturn;
            } catch (err) {
              throw new Error('Error creating the recipe: ' + err.message);
            }
        },
        likeRecipe: async (parent, args, context) => {
            const { recipeId } = args
            const { user } = context
            if (!user) {
                throw new AuthenticationError('You must be logged in to like a recipe.');
            }
            try {
                // Find the recipe by ID
                const recipe = await Recipe.findById(recipeId);
                const likingUser = await User.findById(user._id)
            
                if (!recipe) {
                  throw new Error('Recipe not found');
                }
                if (recipe.likes.includes(user._id)) {
                    recipe.likes.filter(!user._id)
                    likingUser.likedRecipes.filter(!recipe._id)
                    await recipe.save();
                    await likingUser.save()
                    return recipe && likingUser
                  } else {
                    // Add the user's ID to the 'likes' array of the recipe
                    recipe.likes.push(user._id);
                    likingUser.likedRecipes.push(recipe._id)
                    // Save the updated recipe
                    await recipe.save();
                    await likingUser.save()
                  }
                  return recipe
            }catch(err){
                throw new Error('ERROR')
            }
        
        },
        createComment: async (parent, { recipeId, input }, context) => {
            const { user } = context
            if (!user) {
                throw new AuthenticationError('You must be logged in to create a comment.');
            }
            try {
                // Find the recipe by ID
                const recipe = await Recipe.findById(recipeId);
            
                if (!recipe) {
                  throw new Error('Recipe not found');
                }
                    // Add the user's ID to the 'likes' array of the recipe
                const comment = await Comment.create(input)
                recipe.comments.push(comment)
                    // Save the updated recipe
                await recipe.save();
                return recipe
            }catch(err){
                throw new Error('ERROR')
            }
        },
        deleteRecipe: async (parent, { _id }, context) => {
            const { user } = context;
        
            if (!user) {
              throw new AuthenticationError('You must be logged in to delete a recipe.');
            }
        
            try {
              const recipe = await Recipe.findById(_id);
        
              if (!recipe) {
                throw new Error('Recipe not found');
              }
        
              // Check if the user has the permission to delete the recipe
              if (user._id.toString() !== recipe.author.toString()) {
                throw new Error('You do not have permission to delete this recipe.');
              }
        
              // Delete the recipe from the database
              await Recipe.deleteOne({ _id });
        
              return 'Recipe deleted successfully';
            } catch (err) {
              throw new Error('ERROR');
            }
        },
        updateRecipe: async (parent, { _id, input }, context) => {
            const { user } = context;
        
            if (!user) {
              throw new AuthenticationError('You must be logged in to update a recipe.');
            }
        
            try {
              const recipe = await Recipe.findById(_id);
        
              if (!recipe) {
                throw new Error('Recipe not found');
              }
        
              // Check if the user has the permission to delete the recipe
              if (user._id.toString() !== recipe.author.toString()) {
                throw new Error('You do not have permission to delete this recipe.');
              }
        
              // Delete the recipe from the database
              if (input.name) {
                recipe.name = input.name;
              }
              if (input.description) {
                recipe.description = input.description;
              }
              if (input.image) {
                recipe.image = input.image;
              }
              if (input.instructions) {
                recipe.instructions = input.instructions;
              }
              if (input.categories) {
                recipe.categories = input.categories;
              }
              await recipe.save()
              return recipe;
            } catch (err) {
              throw new Error('ERROR');
            }
        },
        deleteUser: async (parent, args, context) => {
            const { user } = context;
            if (user) {
              await User.deleteOne({_id: user._id});
              return 'User removed'
            }
            throw new AuthenticationError('You must loggin to delete a user');
        },
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });
    
          if (!user) {
            throw AuthenticationError;
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw AuthenticationError;
          }
    
          const token = signToken(user);
    
          return { token, user };
        }
    }
}

module.exports = resolvers