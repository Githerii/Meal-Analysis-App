import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

function MealDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals ? data.meals[0] : null))
      .catch((err) => console.error("Error fetching meal details:", err));
  }, [id]);

  if (!meal) return <p>Loading meal details...</p>;

  return (
    <div className="meal-details-container">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-details-image" />
      <h2>{meal.strMeal}</h2>
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Area:</strong> {meal.strArea}</p>
      <p className="instructions"><strong>Instructions:</strong> {meal.strInstructions}</p>
      <h3>Ingredients:</h3>
      <ul>
        {Object.keys(meal)
          .filter((key) => key.startsWith("strIngredient") && meal[key])
          .map((key) => (
            <li key={key}>{meal[key]}</li>
          ))}
      </ul>
      <Link to="/" className="back-btn">⬅ Back to Home</Link>
    </div>
  );
}

export default MealDetails;
