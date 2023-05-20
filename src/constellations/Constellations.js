import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Constellations = () => {
  const [constellations, setConstellations] = useState([]);

  useEffect(() => {
    fetchConstellations();
  }, []);

  const fetchConstellations = async () => {
    try {
      const response = await fetch('http://localhost:3000/constellations');
      const data = await response.json();
      setConstellations(data.constellation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteConstellation = (id) => {
    fetch(`http://localhost:3000/constellations/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        // Usunięcie konstelacji z lokalnego stanu
        const updatedConstellations = constellations.filter(constellation => constellation.id !== id);
        setConstellations(updatedConstellations);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Constellations</h1>
      {constellations.map(constellation => (
        <div key={constellation.id}>
          <h2>{constellation.name}</h2>
          <p>{constellation.description}</p>
          <h3>Stars:</h3>
          <ul>
            {constellation.Stars.map(star => (
              <li key={star.id}>{star.name}</li>
            ))}
          </ul>
          <Link to={`/constellations/edit/${constellation.id}`}>Edit</Link>
          <button onClick={() => deleteConstellation(constellation.id)}>Usuń</button>
        </div>
      ))}
    </div>
  );
};

export default Constellations;
