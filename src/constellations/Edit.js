import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [constellation, setConstellation] = useState({
    name: '',
    description: '',
    imageLink: '',
    constellation: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/constellations/${id}`);
      setConstellation(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setConstellation({ ...constellation, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3000/constellations/edit/${id}`, constellation);
      navigate('/constellations'); // Przekierowanie po zapisaniu
    } catch (error) {
      console.log(error);
    }
  };

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
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={constellation.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageLink">Image Link</label>
          <input
            type="text"
            id="imageLink"
            name="imageLink"
            value={constellation.imageLink}
            onChange={handleInputChange}
          />
        </div>
       
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
