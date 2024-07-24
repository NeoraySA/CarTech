import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/FileUploadComponent.module.css';

const FileUploadComponent = ({ setFormData, onClose }) => {
  const [file, setFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const token = localStorage.getItem('token');

    setLoading(true);
    try {
      console.log('Uploading file:', file.name);
      const response = await axios.post(`${apiUrl}/api/openai/send-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExtractedData(response.data);
      console.log('Data extracted:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (extractedData) {
      setFormData(prevData => ({
        ...prevData,
        ...extractedData
      }));
      onClose();
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>העלאת קובץ</h2>
      <input type="file" className={styles.fileInput} onChange={handleFileChange} />
      <button className={styles.button} onClick={handleFileUpload} disabled={!file || loading}>
        {loading ? 'מעלה ומעבד...' : 'חילוץ נתונים'}
      </button>
      {extractedData && (
        <div>
          <h3 className={styles.heading}>נתונים שהתקבלו</h3>
          <pre className={styles.pre}>{JSON.stringify(extractedData, null, 2)}</pre>
          <button className={styles.button} onClick={handleConfirm}>אשר נתונים</button>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
