import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("chicken");

  // ✅ Load favorites from localStorage when app starts
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Whenever favorites change, save them back to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Fetch data from MealDB API
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

  // ✅ Add to favorites (avoid duplicates)
  function addFavorite(meal) {
    if (!favorites.find((fav) => fav.id === meal.id)) {
      setFavorites([...favorites, meal]);
    }
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                meals={meals}
                search={search}
                setSearch={setSearch}
                addFavorite={addFavorite}
              />
            }
          />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
