import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Stars from './stars/Stars';
import AddStar from './stars/Add';
import EditStarPage from './stars/Edit';

import Constellation from './constellations/Constellations';
import AddConstellation from './constellations/Add';
import EditConstellationPage from './constellations/Edit';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stars">Stars</Link>
            </li>
            <li>
              <Link to="/stars/add">Add Star</Link>
            </li>
            <li>
              <Link to="/constellations">Constellation</Link>
            </li>
            <li>
              <Link to="/constellations/add">Add Constellation</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/stars" element={<Stars />} />
          <Route path="/stars/add" element={<AddStar />} />
          <Route path="/stars/edit/:id" element={<EditStarPage />} />

          <Route path="/constellations" element={<Constellation />} />
          <Route path="/constellations/add" element={<AddConstellation />} />
          <Route path="/constellations/edit/:id" element={<EditConstellationPage />} />

          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Strona główna</h2>;
}

export default App;
