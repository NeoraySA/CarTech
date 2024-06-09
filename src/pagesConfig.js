// pagesConfig.js

import { faCar, faUsers, faHandshake, faBook, faCog, faTools } from '@fortawesome/free-solid-svg-icons';

export const categoriesConfig = [
  {
    name: "רכבים",
    icon: faCar,
    items: [
      { name: "הוספת רכב", path: "/CarAdd" },
      { name: "רשימת רכבים", path: "/carsList" },
      { name: "קטגוריות רכבים", path: "/CarCategories" },
      { name: "מעקב טיפולים", path: "/addVehicle" },
      { name: "מעקב טסטים", path: "/addVehicle" },
      // הוסף כאן כל תת-קטגוריות נוספות שתרצה
    ],
  },
  {
    name: "לקוחות",
    icon: faUsers,
    items: [
      { name: "הוספת לקוח", path: "/CustomerAdd" },
      { name: "רשימת לקוחות", path: "/CustomerList" },
      
      // הוסף כאן כל תת-קטגוריות נוספות שתרצה
    ],
  },
  {
    name: "השכרת רכב",
    icon: faHandshake,
    items: [
      { name: "ניהול הזמנות", path: "/manageRentals" },
      { name: "בדיקת זמינות", path: "/checkAvailability" },
      { name: "פתיחת חוזה", path: "/RentalAdd" },
      { name: "רשימת חוזים", path: "/checkAvailability" },
      // הוסף כאן כל תת-קטגוריות נוספות שתרצה
    ],
  },
  {
    name: "הנהלת חשבונות",
    icon: faBook,
    items: [
      { name: "דוחות כספיים", path: "/financialReports" },
      { name: "תשלומים וחיובים", path: "/payments" },
      // הוסף כאן כל תת-קטגוריות נוספות שתרצה
    ],
  },
  {
    name: "הגדרות",
    icon: faCog,
    items: [
      { name: "הגדרות חברה", path: "/Settings" },
      { name: "הגדרות סניף", path: "/settings/general" },
      { name: "כללי", path: "/settings/general" },
      { name: "אבטחה", path: "/settings/security" },
      // הוסף כאן כל תת-קטגוריות נוספות שתרצה
    ],
  },
  {
    name: "כלים",
    icon: faTools,
    items: [
      { name: "יצירת קישור קצר", path: "/LinkShortener" },
      { name: "מידע ממשרד התחבורה", path: "/LinkShortener" },
      { name: "אתר חושן קאר", path: "https://www.hoshencar.co.il/" },
      
      // הוסף כאן כל תת-קטגוריות נוספות שתרצה
    ],
  },
  // הוסף כאן כל קטגוריות נוספות שתרצה
];




export const pages = [
    { name: 'דף הבית', path: '/', icon: '🏠', description: 'חזור לדף הבית' },
    { name: 'דשבורד', path: '/dashboard', icon: '📊', description: 'צפיה בנתוני החברה' },
    { name: 'הוספת לקוח', path: '/CustomerAdd', icon: '➕', description: 'הוספת לקוח חדש' },
    { name: 'רשימת לקוחות', path: '/CustomerList', icon: '📋', description: 'רשימת הלקוחות במערכת' },
    { name: 'מידע על רכב ממשרד התחבורה', path: '/vehicleInfo', icon: '🚗', description: 'קבלת מידע מפורט על רכב ישירות ממאגר הנתונים של משרד התחבורה' },
    { name: 'הוספת רכב', path: '/addCar', icon: '➕', description: 'הוספת רכב חדש' },
    { name: 'רשימת רכבים', path: '/carsList', icon: '🚗', description: 'רשימת רכבים' },
    { name: 'הגדרות משתמש', path: '/userSettings', icon: '🚗', description: 'הגדרות משתמש' },
    // הוסף כאן עוד דפים לפי הצורך
  ];
  
