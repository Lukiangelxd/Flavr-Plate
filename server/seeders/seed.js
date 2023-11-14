const db = require('../config/connection');
const { Recipe } = require('../models');
const recipeSeeds = require('./recipeSeeds.json');

const cleanDB = require('../config/cleanDB');



db.once('open', async () => {
  try {
    await cleanDB('Recipe', 'recipes');
    
    await Recipe.create(recipeSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
