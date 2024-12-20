// Функция проверки длины строки
// eslint-disable-next-line no-unused-vars
const chekLengthString = (chekString, maxLength) => chekString.length <= maxLength;

// // Строка короче 20 символов
// console.log('Тест №1: Должно быть true, выводит - ' +
//   chekLengthString('проверяемая строка', 20) // true
// );
// // Длина строки ровно 18 символов
// console.log('Тест №2 Должно быть true, выводит - ' +
//   chekLengthString('проверяемая строка', 18) // true
// );
// // Строка длиннее 10 символов
// console.log('Тест №3 Должно быть false, выводит - ' +
//   chekLengthString('проверяемая строка', 10) // false
// );


// Функция проверки на полиндром
// eslint-disable-next-line no-unused-vars
const isPolindrom = (string) => {
  const formatedString = (string.replaceAll(' ', '').toLowerCase());
  let compareString = '';

  for (let i = formatedString.length - 1; i >= 0; i--) {
    compareString += formatedString.at([i]);
  }

  return formatedString === compareString;
};

// // Строка является палиндромом
// console.log('Тест №4 Должно быть true, выводит - ' +
//   isPolindrom('топот') // true
// );
// // Несмотря на разный регистр, тоже палиндром
// console.log('Тест №5 Должно быть true, выводит - ' +
//   isPolindrom('ДовОд') // true
// );
// // Это не палиндром
// console.log('Тест №6 Должно быть false, выводит - ' +
//   isPolindrom('Кекс') // false
// );
// // Это палиндром
// console.log('Тест №7 Должно быть true, выводит - ' +
//   isPolindrom('Лёша на полке клопа нашёл ') // true
// );
