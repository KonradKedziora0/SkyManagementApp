import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [star, setStar] = useState(null);
  const [constellations, setConstellations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [starResponse, constellationsResponse] = await Promise.all([
        axios.get(`http://localhost:3000/stars/${id}`),
        axios.get(`http://localhost:3000/constellations`),
      ]);
      setStar(starResponse.data.star);
      setConstellations(constellationsResponse.data.constellation);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setStar({ ...star, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { name, description } = star;
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/stars/edit/${id}`, star);
      navigate('/stars');
    } catch (error) {
      console.log(error);
    }
  };

  if (!star) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Star</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={star.name}
            onChange={handleInputChange}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={star.description}
            onChange={handleInputChange}
          ></textarea>
          {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
        </div>
        <div>
          <label htmlFor="imageLink">Image Link</label>
          <input
            type="text"
            id="imageLink"
            name="imageLink"
            value={star.imageLink}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="constellation">Constellation</label>
          <select
            id="constellation"
            name="constellationId" // zmieniamy name na "constellationId"
            value={star.constellationId} // zmieniamy na "constellationId"
            onChange={handleInputChange}
          >
            <option value="">Select Constellation</option>
            {constellations.map((constellation) => (
              <option key={constellation.id} value={constellation.id}> {/* zmieniamy value na "constellation.id" */}
                {constellation.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
