import React, { useState } from 'react';
import axios from 'axios';

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
      <h2>Add a New Car</h2>
      {/* Example for one input, repeat for others */}
      <div>
        <label>License Number</label>
        <input
          type="text"
          name="licenseNumber"
          value={car.licenseNumber}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Make</label>
        <input type="text" name="make" value={car.make} onChange={handleChange} />
      </div>
      <div>
        <label>Model</label>
        <input type="text" name="model" value={car.model} onChange={handleChange} />
      </div>
      <div>
        <label>Year</label>
        <input type="number" name="year" value={car.year} onChange={handleChange} />
      </div>
      <div>
        <label>Color</label>
        <input type="text" name="color" value={car.color} onChange={handleChange} />
      </div>
      <div>
        <label>Transmission Type</label>
        <select name="transmissionType" value={car.transmissionType} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      <div>
        <label>Fuel Type</label>
        <select name="fuelType" value={car.fuelType} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>
      </div>
      <div>
        <label>Passenger</label>
        <input type="number" name="passenger" value={car.passenger} onChange={handleChange} />
      </div>
      <div>
        <label>KM to Next Service</label>
        <input type="number" name="kmToNextService" value={car.kmToNextService} onChange={handleChange} />
      </div>
      <div>
        <label>Test Date</label>
        <input type="date" name="testDate" value={car.testDate} onChange={handleChange} />
      </div>
      <div>
        <label>Category</label>
        <input type="text" name="category" value={car.category} onChange={handleChange} />
      </div>

      <button type="submit">Add Car</button>
    </form>
  );
}

export default AddCar;
