import React, { useState } from 'react';

const AddStarForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        }),
      });

      if (response.ok) {
        console.log('Star added successfully!');
        // Clear the form
        setName('');
        setDescription('');
        setImageLink('');
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
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <br />
        <button type="submit">Add Star</button>
      </form>
    </div>
  );
};

export default AddStarForm;
