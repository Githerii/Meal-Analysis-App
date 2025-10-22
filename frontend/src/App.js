import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MealList from "./components/MealList";
import FavoritesList from "./components/FavoritesList";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("chicken");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (search.trim() === "") {
      setMeals([]);
      return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals) {
          const formatted = data.meals.map((m) => ({
            id: m.idMeal,
            name: m.strMeal,
            calories: Math.floor(Math.random() * 400 + 200), 
            image: m.strMealThumb,
            instructions: m.strInstructions,
            ingredients: Object.keys(m)
              .filter((key) => key.startsWith("strIngredient") && m[key])
              .map((key) => m[key]),
          }));
          setMeals(formatted);
        } else {
          setMeals([]);
        }
      })
      .catch((err) => console.error("Error fetching meals:", err));
  }, [search]);

  function addFavorite(meal) {
    if (!favorites.find((fav) => fav.id === meal.id)) {
      setFavorites([...favorites, meal]);
    }
  }

  return (
    <div className="App">
      <h1>Githeri's Meal Analysis App</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <MealList meals={meals} addFavorite={addFavorite} />

      <FavoritesList favorites={favorites} />
    </div>
  );
}

export default App;
