// Функция проверки длины строки
const chekLengthString = (chekString, maxLength) => {
  const cheking = chekString.length <= maxLength;
  return cheking;
};

// Функция проверки на полиндром
const isPolindrom = (string) => {
  const formatSpaceString = (string.replaceAll(' ', ''));
  const formatedString = (formatSpaceString.toLowerCase());

  let compareString = '';

  for (let i = formatedString.length - 1; i >= 0; i--) {
    compareString += formatedString.at([i]);
  }

  const cheking = formatedString === compareString;
  return cheking;
};
