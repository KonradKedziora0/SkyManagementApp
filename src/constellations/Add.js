import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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

  const validateForm = () => {
    const errors = {};

    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!description) {
      errors.description = 'Description is required.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div>
      <h1>Add Constellation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
        </div>
        <br />
        <br />
        <button type="submit">Add Constellation</button>
      </form>
    </div>
  );
};

export default Add;
