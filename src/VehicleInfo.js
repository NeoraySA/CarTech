import React, { useState, useRef } from 'react';
import './VehicleInfo.css';

import ListHeader from './ListHeader';

function VehicleInfo() {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const abortCtrl = useRef(new AbortController());

  const fieldTitles = {
    _id: 'מזהה רכב',
    mispar_rechev: 'מספר רכב',
    tozeret_cd: 'קוד יצרן',
    sug_degem: 'סוג דגם',
    tozeret_nm: 'שם יצרן',
    degem_cd: 'קוד דגם',
    degem_nm: 'שם דגם',
    ramat_gimur: 'רמת גימור',
    ramat_eivzur_betihuty: 'רמת אבזור בטיחותי',
    kvutzat_zihum: 'קבוצת זיהום',
    shnat_yitzur: 'שנת ייצור',
    degem_manoa: 'דגם מנוע',
    mivchan_acharon_dt: 'תאריך מבחן אחרון',
    tokef_dt: 'תוקף',
    baalut: 'בעלות',
    misgeret: 'מסגרת',
    tzeva_cd: 'קוד צבע',
    tzeva_rechev: 'צבע רכב',
    zmig_kidmi: 'זמיג קדמי',
    zmig_ahori: 'זמיג אחורי',
    sug_delek_nm: 'סוג דלק',
    horaat_rishum: 'הוראת רישום',
    moed_aliya_lakvish: 'מועד עלייה לכביש',
    kinuy_mishari: 'כינוי מסחרי',
};
  const handleSearch = async () => {
    if (!licenseNumber.trim()) {
      setError('אנא הזן מספר רישוי');
      return;
    }

    setError('');
    setIsLoading(true);
    abortCtrl.current.abort(); // ביטול בקשות קודמות
    abortCtrl.current = new AbortController(); // יצירת קונטרולר חדש

    try {
      const response = await fetch(`https://data.gov.il/api/3/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&q=${licenseNumber}`, { signal: abortCtrl.current.signal });
      const data = await response.json();
      if (data && data.success) {
        setVehicleData(data.result.records);
      } else {
        setVehicleData(null);
        setError('לא נמצאו תוצאות');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // ביטול לא נחשב לשגיאה
        console.log('Fetch was aborted');
      } else {
        setError('אירעה שגיאה בעת החיפוש');
        console.error('There was an error!', error);
      }
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setError('');
    setLicenseNumber('');
    setVehicleData(null);
    setIsLoading(false);
    abortCtrl.current.abort();
  };

  return (
    <div className="ass">
      <ListHeader
        title="משרד התחבורה"
        subtitle="קבלת מידע על רכב משרתי משרד התחבורה"
        showSearchBox={false}
      />
      <div className="form-container">
      <div className="search-area">
        <div className="search-box">
          <input className='search-car-input'
            type="text"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="הזן מספר רישוי"
            aria-label="מספר רישוי"
          />
        </div>
        <div className="buttons-box">
          <button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'חיפוש...' : 'חפש'}
          </button>
          <button onClick={handleReset} disabled={isLoading}>
            איפוס
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="search-status">מחפש...</div>}
      {!isLoading && vehicleData && (
        <div className="results-container">
          <h2>תוצאות:</h2>
          {vehicleData.map((vehicle, index) => (
            <div key={index} className="card">
              <div className="card-header">{vehicle.tozeret_nm || ''} - {vehicle.kinuy_mishari || ''}</div>
              <div className="card-body">
                {Object.entries(vehicle).map(([key, value]) => (
                  <p key={key}><span>{fieldTitles[key] || key}:</span> {value}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default VehicleInfo;
