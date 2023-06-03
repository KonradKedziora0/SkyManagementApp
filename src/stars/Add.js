import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [constellations, setConstellations] = useState([]);
  const [selectedConstellationId, setSelectedConstellationId] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Resetowanie wiadomości błędów
    setNameError('');
    setDescriptionError('');

    // Sprawdzenie, czy pola Name i Description są wypełnione
    if (!name) {
      setNameError('Please enter a name');
    }
    if (!description) {
      setDescriptionError('Please enter a description');
    }

    // Jeśli wystąpił błąd, przerwij proces dodawania gwiazdy
    if (!name || !description) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/stars/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          imageLink,
          constellationId: selectedConstellationId,
        }),
      });

      if (response.ok) {
        console.log('Star added successfully!');
        setName('');
        setDescription('');
        setImageLink('');
        setSelectedConstellationId('');
        navigate('/stars');
      } else {
        console.error('Failed to add star');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Star</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <span style={{ color: 'red' }}>{nameError}</span>}
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          {descriptionError && <span style={{ color: 'red' }}>{descriptionError}</span>}
        </label>
        <br />
        <label>
          Link to img:
          <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} />
        </label>
        <br />
        <label>
          Constellation:
          <select value={selectedConstellationId} onChange={(e) => setSelectedConstellationId(e.target.value)}>
            <option value="">Select constellation</option>
            {constellations.map((constellation) => (
              <option key={constellation.id} value={constellation.id}>
                {constellation.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <br />
        <button type="submit">Add Star</button>
      </form>
    </div>
  );
};

export default Add;
