import React, { useEffect, useState } from 'react';
import './sky.css';

const Sky = () => {
  const [constellations, setConstellations] = useState([]);
  const [backgroundBrightness, setBackgroundBrightness] = useState({});
  const [starPositions, setStarPositions] = useState({});

  useEffect(() => {
    fetchConstellations();
  }, []);

  const fetchConstellations = async () => {
    try {
      const response = await fetch('http://localhost:3000/constellations');
      const data = await response.json();
      const initialBackgroundBrightness = data.constellation.reduce(
        (acc, constellation) => ({ ...acc, [constellation.id]: 0 }),
        {}
      );
      setBackgroundBrightness(initialBackgroundBrightness);

      const initialConstellations = data.constellation
        .filter((constellation) => constellation.Stars.length > 0) // Filtruj konstelacje bez gwiazd
        .map((constellation) => ({
          ...constellation,
          Stars: constellation.Stars.map((star) => ({ ...star, enabled: true })),
        }));

      setConstellations(initialConstellations);
      setStarPositions(generateStarPositions(initialConstellations));
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const generateStarPositions = (constellations) => {
    const starPositions = {};
    const minOffset = 20;
    const maxOffset = 180;

    constellations.forEach((constellation) => {
      constellation.Stars.forEach((star) => {
        const position = {
          left: Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset,
          top: Math.floor(Math.random() * (maxOffset - minOffset + 1)) + minOffset,
        };
        starPositions[star.id] = position;
      });
    });

    return starPositions;
  };

  const toggleStar = (constellationId, starId) => {
    setConstellations((prevConstellations) =>
      prevConstellations.map((constellation) => {
        if (constellation.id === constellationId) {
          const updatedStars = constellation.Stars.map((star) => {
            if (star.id === starId) {
              return { ...star, enabled: !star.enabled };
            }
            return star;
          });
          return { ...constellation, Stars: updatedStars };
        }
        return constellation;
      })
    );
  };

  const renderStars = (stars, constellationId) => {
    return stars.map((star) => {
      const position = starPositions[star.id];
      const starStyle = {
        left: `${position.left}px`,
        top: `${position.top}px`,
        opacity: star.enabled ? 1 : 0,
      };
      return (
        <span
          key={star.id}
          className="star-dot"
          style={starStyle}
          onClick={() => toggleStar(constellationId, star.id)}
        ></span>
      );
    });
  };

  const renderMoon = (moonVisibility) => {
    if (moonVisibility === 0) {
      return null;
    } else if (moonVisibility === 3) {
      return <span className="moon-dot"></span>;
    } else {
      const moonSizeClass = moonVisibility === 1 ? 'half' : 'half half-second';
      return <span className={`moon-dot ${moonSizeClass}`}></span>;
    }
  };

  const handleMoonVisibilityChange = (constellationId, event) => {
    const value = parseInt(event.target.value);
    setConstellations((prevConstellations) =>
      prevConstellations.map((constellation) => {
        if (constellation.id === constellationId) {
          return { ...constellation, moonVisibility: value };
        }
        return constellation;
      })
    );
  };

  const handleBackgroundBrightnessChange = (constellationId, event) => {
    const value = parseInt(event.target.value);
    setBackgroundBrightness((prevBackgroundBrightness) => ({
      ...prevBackgroundBrightness,
      [constellationId]: value,
    }));
  };

  const getBackgroundColor = (constellationId) => {
    const brightnessPercentage = (backgroundBrightness[constellationId] / 10) * 100;
    return `hsl(0, 0%, ${brightnessPercentage}%)`;
  };

  return (
    <div className="sky-container">
      <div className="constellations-container">
        <h1>My sky</h1>
        {constellations.map((constellation) => (
          <div key={constellation.id} className="constellation-item">
            <div className="constellation-info">
              <h2>{constellation.name}</h2>
              <p>{constellation.description}</p>
              <h3>Stars:</h3>
              <h4>{constellation.stars}</h4>
              <ul>
                {constellation.Stars.map((star) => (
                  <li key={star.id}>
                    {star.name}{' '}
                    <button onClick={() => toggleStar(constellation.id, star.id)}>
                      {star.enabled ? 'On' : 'Off'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="star-window"
              style={{ backgroundColor: getBackgroundColor(constellation.id) }}
            >
              {renderStars(constellation.Stars, constellation.id)}
              {renderMoon(constellation.moonVisibility)}
            </div>
            <div className="sliders-container">
              <div className="moon-slider-container">
                <label htmlFor={`moon-slider-${constellation.id}`}>Moon Visibility:</label>
                <br />
                <input
                  id={`moon-slider-${constellation.id}`}
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={constellation.moonVisibility}
                  onChange={(event) => handleMoonVisibilityChange(constellation.id, event)}
                />
              </div>
              <div className="background-slider-container">
                <label htmlFor={`background-slider-${constellation.id}`}>
                  Background Brightness:
                </label>
                <br />
                <input
                  id={`background-slider-${constellation.id}`}
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={backgroundBrightness[constellation.id] || 0}
                  onChange={(event) => handleBackgroundBrightnessChange(constellation.id, event)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sky;
