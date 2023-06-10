import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [constellation, setConstellation] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/constellations/${id}`);
      setConstellation(response.data.constellation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setConstellation({ ...constellation, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/constellations/edit/${id}`, constellation);
      navigate('/constellations'); // Przekierowanie po zapisaniu
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!constellation.name) {
      errors.name = 'Name is required.';
    }

    if (!constellation.description) {
      errors.description = 'Description is required.';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  if (!constellation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Constellation</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={constellation.name}
            onChange={handleInputChange}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={constellation.description}
            onChange={handleInputChange}
          ></textarea>
          {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
