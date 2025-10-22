import React from "react";
import FavoritesList from "../components/FavoritesList";

function Favorites({ favorites }) {
  return (
    <div>
      <h2>Your Favorite Meals</h2>
      <FavoritesList favorites={favorites} />
    </div>
  );
}

export default Favorites;
