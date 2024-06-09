import React from 'react';
import Head from 'next/head';
import CarCategoryTable from '../components/CarCategoryTable';
import ListHeader from '../components/ListHeader';

const CarCategories = () => {
  return (
    <div>
    <Head>
    <title>קטגוריות רכבים</title>
  </Head>
  <ListHeader
    title="קטגוריות רכבים"
    subtitle="רשימת קטגוריות רכבים"
    showSearchBox={false}  // מונע את הצגת תיבת החיפוש
  />
    <div>
      <CarCategoryTable />
    </div>
    </div>
  );
};

export default CarCategories;
