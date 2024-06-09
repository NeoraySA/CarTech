import React, { useState, useEffect } from 'react';
import SettingsForm from '../components/SettingsForm';

function SettingsPage() {
  const [companyId, setCompanyId] = useState(null);
  const [branchId, setBranchId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setCompanyId(decodedToken.companyId);
      setBranchId(decodedToken.branchId);
    }
  }, []);

  if (companyId === null || branchId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Settings Page</h1>
      <SettingsForm companyId={companyId} branchId={branchId} />
    </div>
  );
}

export default SettingsPage;
