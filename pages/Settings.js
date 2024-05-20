import React from 'react';
import SettingsForm from '../components/SettingsForm';

function SettingsPage() {
  const companyId = 1;  // או כל מזהה חברה אחר שברצונך להשתמש בו
  const branchId = 1;   // או כל מזהה סניף אחר שברצונך להשתמש בו

  return (
    <div>
      <h1>Settings Page</h1>
      <SettingsForm companyId={companyId} branchId={branchId} />
    </div>
  );
}

export default SettingsPage;
