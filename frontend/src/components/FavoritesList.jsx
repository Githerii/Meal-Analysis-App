import React from "react";

function FavoritesList({ favorites }) {
  return (
    <div className="favorites">
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        favorites.map((fav) => (
          <div key={fav.id} className="favorite-card">
            <h4>{fav.name}</h4>
            <p>{fav.calories} calories</p>
          </div>
        ))
      )}
    </div>
  );
}

export default FavoritesList;
