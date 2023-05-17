import React, { useEffect, useState } from 'react';

const Stars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/stars')
      .then(response => response.json())
      .then(data => setStars(data.star))
      .catch(error => console.error('Error:', error));
  }, []);

  const deleteStar = (id) => {
    fetch(`http://localhost:3000/stars/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        // Usunięcie gwiazdy z lokalnego stanu
        const updatedStars = stars.filter(star => star.id !== id);
        setStars(updatedStars);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Stars</h1>
      {stars.map(star => (
        <div key={star.id}>
          <h2>{star.name}</h2>
          <p>{star.description}</p>
          <button onClick={() => deleteStar(star.id)}>Usuń</button>
        </div>
      ))}
    </div>
  );
};

export default Stars;
