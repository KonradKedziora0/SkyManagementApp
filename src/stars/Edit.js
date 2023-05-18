import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [star, setStar] = useState({
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
      const response = await axios.get(`http://localhost:3000/stars/${id}`);
      setStar(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setStar({ ...star, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:3000/stars/edit/${id}`, star);
      navigate('/stars'); // Przekierowanie po zapisaniu
    } catch (error) {
      console.log(error);
    }
  };

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
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={star.description}
            onChange={handleInputChange}
          ></textarea>
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
          <input
            type="text"
            id="constellation"
            name="constellation"
            value={star.constellation}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
