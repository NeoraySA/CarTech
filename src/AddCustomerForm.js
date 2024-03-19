import React, { useState } from 'react';
import './AddCustomerForm.css'; // וודא שהקובץ קיים ומיובא כראוי

function AddCustomerForm() {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    id: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting customer:', customer);
    // כאן יכולה להיות הכנסה לבסיס נתונים או קריאה ל-API
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>הוספת לקוח חדש</h2>
        {Object.keys(customer).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={customer[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">שמור לקוח</button>
      </form>
    </div>
  );
}

export default AddCustomerForm;
