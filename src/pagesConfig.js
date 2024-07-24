import { faCar, faUsers, faHandshake, faBook, faCog, faTools } from '@fortawesome/free-solid-svg-icons';

export const categoriesConfig = [
  {
    name: "רכבים",
    icon: faCar,
    permissions: ["view_cars"], // שינוי הרשאה ל- "add_car"
    items: [
      { name: "הוספת רכב", path: "/CarAdd", permissions: ["add_car"] },
      { name: "רשימת רכבים", path: "/carsList", permissions: ["cars_list"] },
      { name: "קטגוריות רכבים", path: "/CarCategories", permissions: ["car_categories"] },
      { name: "זמינות רכבים", path: "/CarAvailability", permissions: ["view_car_availability"] },
      { name: "מעקב טיפולים", path: "/addVehicle", permissions: ["manage_maintenance"] },
      { name: "מעקב טסטים", path: "/addVehicle", permissions: ["manage_tests"] },
    ],
  },
  {
    name: "לקוחות",
    icon: faUsers,
    permissions: ["view_customers"],
    items: [
      { name: "הוספת לקוח", path: "/CustomerAdd", permissions: ["add_customer"] },
      { name: "רשימת לקוחות", path: "/CustomerList", permissions: ["customers_list"] },
    ],
  },
  {
    name: "השכרת רכב",
    icon: faHandshake,
    permissions: ["menu_rentals"],
    items: [
      { name: "ניהול הזמנות", path: "/manageRentals", permissions: ["manage_orders"] },
      { name: "פתיחת חוזה", path: "/RentalAdd", permissions: ["add_rental"] },
      { name: "רשימת חוזים", path: "/RentalsList", permissions: ["rentals_list"] },
    ],
  },
  {
    name: "הנהלת חשבונות",
    icon: faBook,
    permissions: ["menu_accounting"],
    items: [
      { name: "דוחות כספיים", path: "/financialReports", permissions: ["view_financial_reports"] },
      { name: "תשלומים וחיובים", path: "/payments", permissions: ["manage_payments"] },
    ],
  },
  {
    name: "הגדרות",
    icon: faCog,
    permissions: ["menu_settings"],
    items: [
      { name: "הגדרות כלליות", path: "/Settings/General", permissions: ["settings_general"] },
      { name: "הרשאות", path: "/Settings/Permissions", permissions: ["settings_permissions"] }
    ],
  },
  {
    name: "כלים",
    icon: faTools,
    permissions: ["menu_tools"],
    items: [
      { name: "יצירת קישור קצר", path: "/LinkShortener", permissions: ["create_short_link"] },
      { name: "מידע ממשרד התחבורה", path: "/LinkShortener", permissions: ["access_dmv_info"] },
      { name: "אתר חושן קאר", path: "https://www.hoshencar.co.il/", permissions: ["access_external_sites"] },
    ],
  },
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
];
