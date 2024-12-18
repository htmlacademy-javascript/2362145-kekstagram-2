// Функция проверки длины строки
const chekLengthString = (chekString, maxLength) => {
  const cheking = chekString.length <= maxLength;
  return cheking;
};

// Строка короче 20 символов
chekLengthString('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
chekLengthString('проверяемая строка', 18); // true
// Строка длиннее 10 символов
chekLengthString('проверяемая строка', 10); // false


// Функция проверки на полиндром
const isPolindrom = (string) => {
  const formatedString = (string.replaceAll(' ', '').toLowerCase());
  let compareString = '';

  for (let i = formatedString.length - 1; i >= 0; i--) {
    compareString += formatedString.at([i]);
  }

  const cheking = formatedString === compareString;
  return cheking;
};

// Строка является палиндромом
isPolindrom('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPolindrom('ДовОд'); // true
// Это не палиндром
isPolindrom('Кекс'); // false
// Это палиндром
isPolindrom('Лёша на полке клопа нашёл '); // true
