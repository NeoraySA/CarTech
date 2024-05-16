import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function StreetSelector({ city, onChange }) {
  const [streets, setStreets] = useState([]);

  useEffect(() => {
    if (city) {
      axios.get(`https://data.gov.il/api/3/action/datastore_search?resource_id=a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3&limit=1000&q=${encodeURIComponent(city)}`)
        .then(response => {
          const streetOptions = response.data.result.records.map(street => ({
            label: street.שם_רחוב, value: street.שם_רחוב
          }));
          setStreets(streetOptions);
        })
        .catch(error => {
          console.error('Failed to fetch streets:', error);
        });
    }
  }, [city]);

  return (
    <Select
      options={streets}
      onChange={onChange}
      placeholder="בחר רחוב..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={!streets.length}
    />
  );
}

export default StreetSelector;
