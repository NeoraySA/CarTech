const Tesseract = require('tesseract.js');

Tesseract.recognize(
  'image.jpg', // נתיב לתמונה שלך
  'heb', // שפה לזיהוי (עברית במקרה זה)
  {
    logger: (m) => console.log(m) // לצורך מעקב אחרי התהליך
  }
)
  .then(({ data: { text } }) => {
    console.log(text);
  })
  .catch((error) => {
    console.error(error);
  });
