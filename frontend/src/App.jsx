import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import MealDetails from "./pages/MealDetails"; // ✅ NEW
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("chicken");
  const [favorites, setFavorites] = useState([]);

  // ✅ Fetch from MealDB API
  useEffect(() => {
    if (!search.trim()) return;
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

  // ✅ Add & Remove Favorites
  function addFavorite(meal) {
    if (!favorites.find((fav) => fav.id === meal.id)) {
      setFavorites([...favorites, meal]);
    }
  }

  function removeFavorite(id) {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home meals={meals} search={search} setSearch={setSearch} addFavorite={addFavorite} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} removeFavorite={removeFavorite} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/meal/:id" element={<MealDetails />} /> {/* ✅ Dynamic Route */}
      </Routes>
    </Router>
  );
}

export default App;
