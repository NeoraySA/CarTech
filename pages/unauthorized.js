import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div>
      <Head>
        <title>אין הרשאה למתשמש</title>
      </Head>
      <h1>אין לך הרשאה לגשת לדף זה</h1>
      <Link href="/">חזור לדף הבית</Link>
    </div>
  );
};

export default Unauthorized;
