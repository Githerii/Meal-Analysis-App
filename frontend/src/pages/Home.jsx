import React from "react";
import SearchBar from "../components/SearchBar";
import MealList from "../components/MealList";

function Home({ meals, search, setSearch, addFavorite }) {
  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      <MealList meals={meals} addFavorite={addFavorite} />
    </div>
  );
}

export default Home;
