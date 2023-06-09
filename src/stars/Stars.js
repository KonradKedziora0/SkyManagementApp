import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Stars = () => {
  const [stars, setStars] = useState([]);
  const [constellations, setConstellations] = useState([]);

  useEffect(() => {
    fetchStars();
    fetchConstellations();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch('http://localhost:3000/stars');
      const data = await response.json();
      setStars(data.star);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchConstellations = async () => {
    try {
      const response = await fetch('http://localhost:3000/constellations');
      const data = await response.json();
      setConstellations(data.constellation);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const getConstellationNames = (constellationIds) => {
    const uniqueConstellationIds = [...new Set(constellationIds)];
    return uniqueConstellationIds.map(id => {
      const constellation = constellations.find(c => c.id === id);
      return constellation ? constellation.name : '';
    });
  };

  return (
    <div>
      <h1>Stars</h1>
      <div className="item_body">
        {stars.map(star => (
          <div className="item" key={star.id}>
            <h3 className="item_title">{star.name}</h3>
            <p>{star.imageLink}</p>
            <p>{star.description}</p>
            <h3>Constellations:</h3>
            <ul className="item_edit">
              {getConstellationNames(
                stars
                  .filter(s => s.constellationId === star.constellationId)
                  .map(s => s.constellationId)
              ).map(constellationName => (
                <li key={constellationName}>{constellationName}</li>
              ))}
            </ul>
            <Link to={`/stars/edit/${star.id}`}>Edit</Link>
            <button onClick={() => deleteStar(star.id)}>Usuń</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stars;
