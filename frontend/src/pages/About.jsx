import React from "react";

function About() {
  return (
    <div>
      <h2>About This App</h2>
       <p>
          Welcome to <strong>Githeri’s Meal Analysis App</strong> — your personal
          guide to exploring delicious meals from around the world! This app
          allows users to search, analyze, and save their favorite dishes using
          data fetched from <strong>TheMealDB API</strong>.
        </p>

        <p>
          The inspiration for this project comes from our beloved Kenyan dish
          <em> githeri</em> — a humble yet nutritious meal that reflects the
          spirit of simplicity and togetherness. Our goal is to make meal
          exploration both informative and fun!
        </p>

        <p>
          Future updates will include features like user accounts, personalized
          meal tracking, and recommendations based on your favorite meals.
          Whether you’re a foodie or just curious, this app has something for
          everyone.
        </p>
        <img
        src="https://media.tenor.com/njV98bs-BBgAAAAM/chipmunk.gif"
        alt="Dancing animal eating food"
        className="about-image"
      />
    </div>
  );
}

export default About;
