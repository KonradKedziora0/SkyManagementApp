import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Stars from './stars/Stars';
import Add from './stars/Add';
import Delete from './stars/Delete';

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
              <Link to="/stars/delete">Delete Star</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/stars" element={<Stars />} />
          <Route path="/stars/add" element={<Add />} />
          <Route path="/stars/delete" element={<Delete />} />
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
