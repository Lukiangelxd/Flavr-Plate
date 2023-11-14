import Header from '../components/Header/Header';
import Card from '../components/Card/Card';
import Searchbar from '../components/Searchbar/Searchbar';
import RecipeCard from '../components/RecipeCard/recipeCard'
import React from 'react';

const Home = () => {
  const [searchResult, setSearchResult] = React.useState([]);
  const [searchTriggered, setSearchTriggered] = React.useState(false);

  // Callback function to update the search result data
  const handleSearchResult = (result) => {
    setSearchResult(result);
    setSearchTriggered(true);
    console.log(result)
  };
  return (
    <div>
      <Header />
      <Card />
      <Searchbar onSearchResult={handleSearchResult} />
      {searchTriggered ? (
        // Check if search has been triggered and map over the array to render RecipeCards
        searchResult.length > 0 ? (
          searchResult.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
        ) : (
          // Display a message or fallback content if there are no recipes
          <p>No recipes found.</p>
        )
      ) : null}
    </div>
  );
};

export default Home;