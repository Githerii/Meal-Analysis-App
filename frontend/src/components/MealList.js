import React from "react";
import MealCard from "./MealCard";

function MealList({ meals, addFavorite }) {
  return (
    <div className="meal-list">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} addFavorite={addFavorite} />
      ))}
    </div>
  );
}

export default MealList;
