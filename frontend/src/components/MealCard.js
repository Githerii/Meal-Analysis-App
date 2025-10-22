import React from "react";

function MealCard({ meal, addFavorite }) {
  return (
    <div className="meal-card">
      <img src={meal.image} alt={meal.name} className="meal-img" />
      <h3>{meal.name}</h3>
      <p>Calories: {meal.calories}</p>
      <p><strong>Ingredients:</strong> {meal.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> {meal.instructions.slice(0, 100)}...</p>
      <button onClick={() => addFavorite(meal)}>Add to Favorites</button>
    </div>
  );
}

export default MealCard;
