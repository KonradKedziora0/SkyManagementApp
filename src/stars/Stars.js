import React, { useEffect, useState } from 'react';

const Stars = () => {
    const [stars, setStars] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:3000/stars')
        .then(response => response.json())
        .then(data => setStars(data.star)) // Zmieniamy przypisanie na `setStars(data.star)`
        .catch(error => console.error('Error:', error));
    }, []);

  return (
    <div>
      <h1>Stars</h1>
      {stars.map(star => (
        <div key={star.id}>
          <h2>{star.name}</h2>
          <p>{star.description}</p>

        </div>
      ))}
    </div>
  );
};

export default Stars;
