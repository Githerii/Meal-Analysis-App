import React from "react";
import MealList from "../components/MealList";
import "../App.css";

function Home({ meals, search, setSearch, addFavorite }) {
  return (
    <div className="home-container">
     
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">🍽️ Discover Delicious Meals</h1>
          <p className="hero-subtitle">
            Search for any meal, explore its ingredients, and save your favorites for later!
          </p>
          <div className="search-bar">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a meal..."
              className="search-input"
            />
          </div>
        </div>
      </section>

      <section className="meals-section">
        {meals.length > 0 ? (
          <MealList meals={meals} addFavorite={addFavorite} />
        ) : (
          <p className="no-results">No meals found. Try searching something else!</p>
        )}
      </section>
    </div>
  );
}

export default Home;
