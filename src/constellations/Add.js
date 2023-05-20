import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/constellations/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          imageLink,
        }),
      });

      if (response.ok) {
        console.log('Constellation added successfully!');
        // Clear the form
        setName('');
        setDescription('');
        setImageLink('');
        // Przekierowanie po dodaniu
        navigate('/constellations');
      } else {
        console.error('Failed to add constellation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Add Constellation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
       
        <br />
        <br />
        <button type="submit">Add Constellation</button>
      </form>
    </div>
  );
};

export default Add;
