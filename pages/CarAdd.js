import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import AddCarForm from '../components/AddCarForm';
import ListHeader from '../components/ListHeader';
function CarAdd() {
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    const storedCompanyId = localStorage.getItem('company_id');
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>הוספת רכב חדש</title>
      </Head>
      <ListHeader
        title="הוספת רכב חדש"
        subtitle="מילוי פרטי הרכב"
        showSearchBox={false}  // מונע את הצגת תיבת החיפוש
      />
      <AddCarForm companyId={companyId} />
    </div>
  );
}

export default CarAdd;
