import React, { useState, useEffect } from 'react';

import './ColorEditor.css';

const ColorEditor = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Fetch the initial color data from the server
    fetch('http://localhost:3001/api/colors')
      .then((response) => response.json())
      .then((data) => setColors(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const updateColor = (colorId, newHex) => {
    // Update the color on the server
    fetch(`http://localhost:3001/api/colors/${colorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hex_code: newHex }),
    })
    .then((response) => response.json())
    .then(() => {
      // Update the color in the local state
      setColors((prevColors) =>
        prevColors.map((color) =>
          color.color_id === colorId ? { ...color, hex_code: newHex } : color
        )
      );
    })
    .catch((error) => console.error('Error:', error));
  };

  const handleColorChange = (colorId, event) => {
    const newHex = event.target.value.slice(1); // Remove the '#' from the color value
    updateColor(colorId, newHex);
  };

  return (
    <div className="color-editor">
      {colors.map((color) => (
        <div key={color.color_id} className="color-item">
          <div className="color-name">{color.color_name}</div>
          <input
            type="color"
            value={`#${color.hex_code}`}
            onChange={(event) => handleColorChange(color.color_id, event)}
          />
        </div>
      ))}
    </div>
  );
};

export default ColorEditor;
