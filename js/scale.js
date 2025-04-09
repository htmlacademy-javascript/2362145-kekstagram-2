const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

// Изменяет масштаб изображения и записывает значение в поле формы
const setScale = (value) => {
  const scale = Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
  imageUploadPreview.style.transform = `scale(${scale / 100})`;
  scaleControlValue.value = `${scale}%`;
};


// Обработчик кнопки уменьшения масштаба

const onScaleControlSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue - SCALE_STEP);
};

// Обработчик кнопки увеличения масштаба

const onScaleControlBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue + SCALE_STEP);
};

// Инициализирует обработчики масштабирования

const initScale = () => {
  setScale(DEFAULT_SCALE);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

// Удаляет обработчики масштабирования

const destroyScale = () => {
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
};

// Сбрасывает масштаб к значению по умолчанию

const resetScale = () => {
  setScale(DEFAULT_SCALE);
};

export { initScale, destroyScale, resetScale };
