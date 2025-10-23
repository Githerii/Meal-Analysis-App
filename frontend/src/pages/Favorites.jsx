import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Favorites({ favorites, removeFavorite }) {
  return (
    <div className="favorites-container">
      <h2 className="favorites-title">💖 Your Favorite Meals</h2>

      {favorites.length === 0 ? (
        <p className="no-favorites">You haven’t added any favorites yet.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((meal) => (
            <div key={meal.id} className="favorite-card">
              <img src={meal.image} alt={meal.name} className="favorite-image" />
              <h3>{meal.name}</h3>
              <div className="favorite-buttons">
                <Link to={`/meal/${meal.id}`} className="view-btn">
                  View Details
                </Link>
                <button
                  onClick={() => removeFavorite(meal.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
