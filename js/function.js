// Функция проверки длины строки
const chekLenghtString = (chekString, maxLenght) => {
  const cheking = chekString.length <= maxLenght;
  return cheking;
};

// Функция проверки на полиндром
const isPolindrom = (string) => {
  const formatSpaceString = (string.replaceAll(' ', ''));
  const formatString = (formatSpaceString.toLowerCase());

  let compareString = '';

  for (let i = formatString.length - 1; i >= 0; i--) {
    compareString += formatString.at([i]);
  }

  const cheking = formatString === compareString;
  return cheking;
};
