import React from 'react';
import './Modal.css'; // צריך ליצור קובץ CSS זה

const Modal = ({ isOpen, onClose, color, onSave }) => {
  const [colorName, setColorName] = React.useState(color.color_name);
  const [hexCode, setHexCode] = React.useState(color.hex_code);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(color.id, colorName, hexCode);
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2>Edit Color</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="colorName">Color Name:</label>
            <input
              id="colorName"
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hexCode">Hex Code:</label>
            <input
              id="hexCode"
              type="text"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
            />
          </div>
          <button type="submit" className="save-btn">Save Changes</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default Modal;
