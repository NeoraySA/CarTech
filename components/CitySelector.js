import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

function CitySelector({ onChange }) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1000')
      .then(response => {
        const cityOptions = response.data.result.records.map(city => ({
          label: city.שם_ישוב, value: city.שם_ישוב
        }));
        setCities(cityOptions);
      })
      .catch(error => {
        console.error('Failed to fetch cities:', error);
      });
  }, []);

  return (
    <Select
      options={cities}
      onChange={onChange}
      placeholder="בחר עיר..."
      noOptionsMessage={() => 'לא נמצאו תוצאות'}
      isLoading={!cities.length}
    />
  );
}

export default CitySelector;
