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
      <div class="item_body">
      {constellations.map(constellation => (
        <div class="item" key={constellation.id}>
          <h3 class="item_title">{constellation.name}</h3>
          <p>{constellation.description}</p>
          <h4>Stars:</h4>
          <ul class="item_edit">
            {constellation.Stars.map(star => (
              <li class="const_li" key={star.id}>{star.name}</li>
            ))}
          </ul>
          <Link to={`/constellations/edit/${constellation.id}`}>Edit</Link>
          <button onClick={() => deleteConstellation(constellation.id)}>Usuń</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Constellations;
