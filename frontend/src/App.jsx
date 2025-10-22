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

  // ✅ Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Fetch meals from MealDB API when search changes
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

  // ✅ Try to load favorites from json-server when app starts
  useEffect(() => {
    fetch("http://localhost:3001/favorites")
      .then((res) => {
        if (!res.ok) throw new Error("Server not available");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
          localStorage.setItem("favorites", JSON.stringify(data));
        }
      })
      .catch((err) => {
        console.warn("Could not load favorites from server:", err.message);
      });
  }, []);

  // ✅ Keep localStorage updated whenever favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ✅ Add favorite (POST to server, update state)
  function addFavorite(meal) {
    if (favorites.find((f) => f.id === meal.id)) return;

    const payload = {
      id: meal.id,
      name: meal.name,
      calories: meal.calories,
      image: meal.image,
    };

    fetch("http://localhost:3001/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("POST failed");
        return res.json();
      })
      .then((data) => {
        setFavorites((prev) => {
          const updated = [...prev, data];
          localStorage.setItem("favorites", JSON.stringify(updated));
          return updated;
        });
      })
      .catch((err) => {
        console.warn("POST failed — saving locally:", err.message);
        setFavorites((prev) => {
          const updated = [...prev, meal];
          localStorage.setItem("favorites", JSON.stringify(updated));
          return updated;
        });
      });
  }

  // ✅ Remove favorite (DELETE on server, update state)
  function removeFavorite(mealId) {
    fetch(`http://localhost:3001/favorites/${mealId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("DELETE failed");
        setFavorites((prev) => {
          const updated = prev.filter((f) => f.id !== mealId);
          localStorage.setItem("favorites", JSON.stringify(updated));
          return updated;
        });
      })
      .catch((err) => {
        console.warn("DELETE failed — removing locally:", err.message);
        setFavorites((prev) => {
          const updated = prev.filter((f) => f.id !== mealId);
          localStorage.setItem("favorites", JSON.stringify(updated));
          return updated;
        });
      });
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
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFavorite={removeFavorite}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
