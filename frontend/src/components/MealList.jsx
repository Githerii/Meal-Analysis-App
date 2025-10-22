import React from "react";
import MealCard from "./MealCard";

function MealList({ meals, addFavorite }) {
  return (
    <div className="meal-list">
      {meals.length > 0 ? (
        meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} addFavorite={addFavorite} />
        ))
      ) : (
        <p>No meals found. Try searching something else!</p>
      )}
    </div>
  );
}

export default MealList;
