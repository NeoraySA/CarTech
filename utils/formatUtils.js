export const formatNumber = (number) => {
  return new Intl.NumberFormat('he-IL').format(number);
};

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(number);
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatDateOnly = (date) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return 'תאריך לא חוקי'; // או כל הודעה אחרת שתרצה להציג במקרה של תאריך לא חוקי
  }
  return new Intl.DateTimeFormat('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
};

export const formatLicensePlate = (number) => {
  const numberString = number.toString();
  if (numberString.length === 7) {
    return numberString.replace(/(\d{2})(\d{3})(\d{2})/, '$1-$2-$3');
  } else if (numberString.length === 8) {
    return numberString.replace(/(\d{3})(\d{2})(\d{3})/, '$1-$2-$3');
  }
  return numberString; // אם המספר לא מתאים לתבניות
};

export const formatPhoneNumber = (number) => {
  const numberString = number.toString();
  if (numberString.length === 10) {
    return numberString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return numberString; // אם המספר לא מתאים לתבניות
};
