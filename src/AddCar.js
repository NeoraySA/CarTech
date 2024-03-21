import React, { useState } from 'react';
import axios from 'axios';
import './AddCar.css';

function AddCar() {
  const [car, setCar] = useState({
    licenseNumber: '',
    make: '',
    model: '',
    year: '',
    color: '',
    transmissionType: '',
    fuelType: '',
    passenger: '', // שיניתי את שם השדה ל- passenger
    kmToNextService: '',
    testDate: '',
    category: ''
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/cars', car);
      console.log(response.data);
      alert('Car added successfully');
      // Reset form
      setCar({
        licenseNumber: '',
        make: '',
        model: '',
        year: '',
        color: '',
        transmissionType: '',
        fuelType: '',
        passenger: '', // שיניתי את שם השדה ל- passenger
        kmToNextService: '',
        testDate: '',
        category: ''
      });
    } catch (error) {
      console.error('Error adding car:', error);
      alert('Failed to add car');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>הוספת רכב</h2>
      {/* Example for one input, repeat for others */}
      <div>
        <label>מס' רישוי</label>
        <input
          type="text"
          name="licenseNumber"
          value={car.licenseNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>יצרן</label>
        <input type="text" name="make" value={car.make} onChange={handleChange} />
      </div>
      <div>
        <label>דגם</label>
        <input type="text" name="model" value={car.model} onChange={handleChange} />
      </div>
      <div>
        <label>שנת ייצור</label>
        <input type="number" name="year" value={car.year} onChange={handleChange} />
      </div>
      <div>
        <label>צבע</label>
        <input type="text" name="color" value={car.color} onChange={handleChange} />
      </div>
      <div>
        <label>תיבת הילוכים</label>
        <select name="transmissionType" value={car.transmissionType} onChange={handleChange}>
          <option value="">בחירת סוג תיבת הילוכים</option>
          <option value="אוטומט">אוטומט</option>
          <option value="ידני">ידני</option>
        </select>
      </div>
      <div>
        <label>סוג דלק</label>
        <select name="fuelType" value={car.fuelType} onChange={handleChange}>
          <option value="">בחירת סוג דלק</option>
          <option value="בנזין 95">בנזין 95</option>
          <option value="דיזל">דיזל</option>
          <option value="electric">חשמל</option>
        </select>
      </div>
      <div>
        <label>מס' נוסעים</label>
        <input type="number" name="passenger" value={car.passenger} onChange={handleChange} />
      </div>
      <div>
        <label>ק"מ לטיפול הבא</label>
        <input type="number" name="kmToNextService" value={car.kmToNextService} onChange={handleChange} />
      </div>
      <div>
        <label>תאריך טסט</label>
        <input type="date" name="testDate" value={car.testDate} onChange={handleChange} />
      </div>
      <div>
  <label>קטגוריה</label>
  <select name="category" value={car.category} onChange={handleChange}>
    <option value="">בחר...</option>
    <option value="מיני">מיני</option>
    <option value="משפחתיות קטנות">משפחתיות קטנות</option>
    <option value="משפחתיות">משפחתיות</option>
    <option value="משפחתיות סטיישן">משפחתיות סטיישן</option>
    <option value="הייבריד">הייבריד</option>
    <option value="מיניואן - 7 מקומות">מיניואן - 7 מקומות</option>
    <option value="וואן 9 - מקומות">וואן 9 - מקומות</option>
  </select>
</div>


      <button type="submit">Add Car</button>
    </form>
  );
}

export default AddCar;
