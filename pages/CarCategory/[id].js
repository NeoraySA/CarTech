import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import moment from 'moment';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import CarCategoryDetails from '../../components/CarCategoryDetails';
import UniversalDataList from '../../components/UniversalDataList';
import ListHeader from '../../components/ListHeader';
import Notification from '../../components/Notification';
import RateTypeSelector from '../../components/RateTypeSelector';
import { formatDateOnly, formatCurrency, formatNumber, formatLicensePlate } from '../../utils/formatUtils';
import labelTranslations from '../../src/translations';
import styles from '../../styles/Page.module.css';
import {
  getCategoryDetails,
  updateCategoryDetails,
  uploadImage,
  getSpecialRates,
  saveSpecialRate,
  deleteSpecialRate,
  getCars,
  saveCar,
  deleteCar,
  getCategoryRates,
  saveCategoryRate,
  deleteCategoryRate
} from '../../services/CategoryService';

import withAuth from '../../src/hoc/withAuth';

function CarCategoryPage() {
  const router = useRouter();
  const { id } = router.query;
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '', onConfirm: null });
  const [specialRates, setSpecialRates] = useState([]);
  const [cars, setCars] = useState([]);
  const [categoryRates, setCategoryRates] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const token = localStorage.getItem('token');
        try {
          setNotification({ message: 'טוען פרטי קטגוריה...', type: 'info', onConfirm: null });
          const [categoryDetailsData, specialRatesData, carsData, categoryRatesData] = await Promise.all([
            getCategoryDetails(id, token),
            getSpecialRates(id, token),
            getCars(id, token),
            getCategoryRates(id, token)
          ]);
          setCategoryDetails(categoryDetailsData);
          setSpecialRates(specialRatesData);
          setCars(carsData);
          setCategoryRates(categoryRatesData);
          setNotification({ message: '', type: '', onConfirm: null });
        } catch (error) {
          console.error('Error fetching data:', error);
          setNotification({ message: 'שגיאה בשליפת הנתונים!', type: 'error', onConfirm: null });
        }
      }
    }

    fetchData();
  }, [id]);

  const handleSaveCategoryDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      if (imageFile) {
        const imageUrl = await uploadImage(imageFile, token);
        categoryDetails.image_url = imageUrl;
      }

      await updateCategoryDetails(categoryDetails, token);
      setNotification({ message: 'הקטגוריה עודכנה בהצלחה!', type: 'success', onConfirm: null });
      setTimeout(() => {
        setNotification({ message: '', type: '', onConfirm: null });
        router.push('/CarCategories');
      }, 3000);
    } catch (error) {
      console.error('Error updating category:', error);
      setNotification({ message: 'שגיאה בעדכון הקטגוריה!', type: 'error', onConfirm: null });
    }
  };

  const handleSaveSpecialRate = async (formData) => {
    const token = localStorage.getItem('token');
    const updatedFormData = {
      ...formData,
      category_id: id,
      include_saturday_holiday: formData.include_saturday_holiday ? 1 : 0,
      start_date: moment(formData.start_date).format('YYYY-MM-DD'),
      end_date: moment(formData.end_date).format('YYYY-MM-DD')
    };

    try {
      await saveSpecialRate(updatedFormData, token);
      setNotification({ message: 'התעריף נשמר בהצלחה!', type: 'success', onConfirm: null });
      const specialRatesData = await getSpecialRates(id, token);
      setSpecialRates(specialRatesData);
    } catch (error) {
      console.error('Error saving special rate:', error);
      setNotification({ message: 'שגיאה בשמירת התעריף!', type: 'error', onConfirm: null });
    }
  };

  const handleDeleteSpecialRate = async (rate) => {
    const token = localStorage.getItem('token');
    const rateId = rate.id;

    try {
      await deleteSpecialRate(rateId, token);
      setNotification({ message: 'התעריף נמחק בהצלחה!', type: 'success', onConfirm: null });
      const specialRatesData = await getSpecialRates(id, token);
      setSpecialRates(specialRatesData);
    } catch (error) {
      console.error('Error deleting special rate:', error);
      setNotification({ message: 'שגיאה במחיקת התעריף!', type: 'error', onConfirm: null });
    }
  };

  const handleSaveCar = async (formData) => {
    const token = localStorage.getItem('token');

    try {
      await saveCar(formData, token);
      setNotification({ message: 'הרכב נשמר בהצלחה!', type: 'success', onConfirm: null });
      const carsData = await getCars(id, token);
      setCars(carsData);
    } catch (error) {
      console.error('Error saving car:', error);
      setNotification({ message: 'שגיאה בשמירת הרכב!', type: 'error', onConfirm: null });
    }
  };

  const handleDeleteCar = async (car) => {
    const token = localStorage.getItem('token');
    const carId = car.id;

    try {
      await deleteCar(carId, token);
      setNotification({ message: 'הרכב נמחק בהצלחה!', type: 'success', onConfirm: null });
      const carsData = await getCars(id, token);
      setCars(carsData);
    } catch (error) {
      console.error('Error deleting car:', error);
      setNotification({ message: 'שגיאה במחיקת הרכב!', type: 'error', onConfirm: null });
    }
  };

  const handleSaveCategoryRate = async (formData) => {
    const token = localStorage.getItem('token');
    const updatedFormData = {
      ...formData,
      category_id: id,
      saturday_regular_charge: formData.saturday_regular_charge ? 1 : 0,
      saturday_km_included: formData.saturday_km_included ? 1 : 0
    };

    try {
      await saveCategoryRate(updatedFormData, token);
      setNotification({ message: 'התעריף נשמר בהצלחה!', type: 'success', onConfirm: null });
      const categoryRatesData = await getCategoryRates(id, token);
      setCategoryRates(categoryRatesData);
    } catch (error) {
      console.error('Error saving category rate:', error);
      setNotification({ message: 'שגיאה בשמירת התעריף!', type: 'error', onConfirm: null });
    }
  };

  const handleDeleteCategoryRate = async (rate) => {
    const token = localStorage.getItem('token');
    const rateId = rate.id;

    try {
      await deleteCategoryRate(rateId, token);
      setNotification({ message: 'התעריף נמחק בהצלחה!', type: 'success', onConfirm: null });
      const categoryRatesData = await getCategoryRates(id, token);
      setCategoryRates(categoryRatesData);
    } catch (error) {
      console.error('Error deleting category rate:', error);
      setNotification({ message: 'שגיאה במחיקת התעריף!', type: 'error', onConfirm: null });
    }
  };

  const handleEdit = (row) => {
    console.log("Editing item:", row);
    const item = row.original || row; // Handle cases where original is not present
    if (specialRates.includes(item)) {
      setNewItem(item);
      setIsModalOpen(true);
    } else if (categoryRates.includes(item)) {
      setNewItem(item);
      setIsModalOpen(true);
    } else if (cars.includes(item)) {
      setNewItem(item);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (row) => {
    console.log("Deleting item:", row);
    const item = row.original || row; // Handle cases where original is not present
    setNotification({
      message: 'האם אתה בטוח שברצונך למחוק את הפריט?',
      type: 'confirm',
      onConfirm: () => {
        if (specialRates.includes(item)) {
          handleDeleteSpecialRate(item);
        } else if (categoryRates.includes(item)) {
          handleDeleteCategoryRate(item);
        } else if (cars.includes(item)) {
          handleDeleteCar(item);
        }
      }
    });
  };

  const specialRatesColumns = [
    {
      Header: 'שם תעריף ותאריכים',
      accessor: 'rate_name',
      Cell: ({ row }) => (
        <div>
          <div>{row.original.rate_name}</div>
          <span>{`${formatDateOnly(row.original.start_date)} - ${formatDateOnly(row.original.end_date)}`}</span>
        </div>
      )
    },
    { Header: labelTranslations['daily_rate'] || 'תעריף יומי', accessor: 'daily_rate', Cell: ({ value }) => formatCurrency(value) },
    { Header: labelTranslations['include_saturday_holiday'] || 'כולל שבתות וחגים', accessor: 'include_saturday_holiday', Cell: ({ value }) => value ? 'כן' : 'לא' }
  ];

  const carsColumns = [
    { Header: 'מס\' רישוי', accessor: 'license_number', Cell: ({ value }) => formatLicensePlate(value) },
    { Header: 'יצרן ודגם', accessor: 'make_and_model' },
    { Header: 'צבע', accessor: 'color' },
    { Header: 'שנה', accessor: 'year' }
  ];

  const categoryRatesColumns = [
    { Header: 'סוג תעריף', accessor: 'rate_type_name' },
    { Header: 'מחיר', accessor: 'price', Cell: ({ value }) => formatCurrency(value) },
    { Header: 'הגבלת ק"מ', accessor: 'km_limit_per_unit', Cell: ({ value }) => formatNumber(value) },
    { Header: 'עלות לק"מ נוסף', accessor: 'extra_km_price', Cell: ({ value }) => formatCurrency(value) },
    { Header: 'חיוב רגיל בשבת או חג', accessor: 'saturday_regular_charge', Cell: ({ value }) => (value ? 'כן' : 'לא') },
    { Header: 'ק"מ בשבת / חג', accessor: 'saturday_km_included', Cell: ({ value }) => (value ? 'כן' : 'לא' ) }
  ];

  const actionButtons = [
    {
      label: 'ערוך',
      icon: FaEdit,
      onClick: handleEdit,
      permissions: ['edit_rate']
    },
    {
      label: 'מחק',
      icon: FaTrash,
      onClick: handleDelete,
      permissions: ['delete_rate']
    }
  ];

  const handleGoToCategoriesList = () => {
    router.push('/CarCategories');
  };

  const handleGoToCarsList = () => {
    router.push('/carsList');
  };

  const customRenderers = {
    rate_type_id: (value) => (
      <RateTypeSelector 
        onChange={(selected) => setCategoryRates((prevRates) => ({
          ...prevRates,
          rate_type_id: selected.value
        }))}
        value={{ label: value, value: value }}
      />
    )
  };

  return (
    <div>
      <Head>
        <title>עריכת קטגוריית רכב</title>
      </Head>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <div>
      {categoryDetails && (
        <>
          <ListHeader
            title="עריכת קטגוריה"
            subtitle="עריכת קטגוריה"
            showSearchBox={false}
            buttons={[
              {
                label: 'שמור',
                onClick: handleSaveCategoryDetails
              }
            ]}
            secondaryButtons={[
              {
                label: 'רשימת קטגוריות',
                onClick: handleGoToCategoriesList,
                permissions: ['car_categories']
              },
              {
                label: 'רשימת רכבים',
                onClick: handleGoToCarsList,
                permissions: ['cars_list']
              }
            ]}
          />
          <div className={styles.mainSection}>
            <div className={styles.section1}>
              <CarCategoryDetails category={categoryDetails} setCategoryDetails={setCategoryDetails} setImageFile={setImageFile} />
            </div>
            <div className={styles.section2}>
              <div className={styles.card}>
                <UniversalDataList 
                  data={categoryRates}
                  formFields={['rate_type_id', 'price', 'saturday_holiday_price', 'new_driver_price_increase', 'young_driver_price_increase', 'km_limit_per_unit', 'extra_km_price', 'saturday_regular_charge', 'saturday_km_included']}
                  columns={categoryRatesColumns}
                  title="תעריפים"
                  description="כאן מוגדרים התעריפים המשויכים לקטגוריה זו. קטגוריות שלא קיים בהם תעריף לא יופיעו בתוצאות החיפוש!"
                  addButtonLabel="הוספת תעריף"
                  addButtonPermissions={['add_rate']}
                  actionButtons={actionButtons}
                  onSave={handleSaveCategoryRate}
                  onDelete={handleDeleteCategoryRate}
                  notification={notification}
                  setNotification={setNotification}
                  customRenderers={customRenderers}
                />
              </div>
              <div className={styles.card}>
                <UniversalDataList 
                  data={specialRates}
                  formFields={['rate_name', 'daily_rate', 'start_date', 'end_date',  'include_saturday_holiday']}
                  columns={specialRatesColumns}
                  title="תעריפים מיוחדים"
                  description="כאן מוגדרים התעריפים המיוחדים המשויכים לקטגוריה זו"
                  addButtonLabel="הוספת תעריף מיוחד"
                  addButtonPermissions={['add_special_rate']}
                  actionButtons={actionButtons}
                  onSave={handleSaveSpecialRate}
                  onDelete={handleDeleteSpecialRate}
                  notification={notification}
                  setNotification={setNotification}
                />
              </div>
              <div className={styles.card}>
                <UniversalDataList 
                  data={cars}
                  formFields={['license_number', 'make', 'model', 'color', 'year']}
                  columns={carsColumns}
                  title="רשימת רכבים"
                  description="רשימת הרכבים המשויכים לקטגוריה זו"
                  addButtonLabel={false}
                  onSave={handleSaveCar}
                  onDelete={handleDeleteCar}
                  notification={notification}
                  setNotification={setNotification}
                />
              </div>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}

export default withAuth(CarCategoryPage, ['car_category_details']);
