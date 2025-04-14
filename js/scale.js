const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const imageUploadPreview = document.querySelector('.img-upload__preview img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const setScale = (value) => {
  const scale = Math.min(Math.max(value, MIN_SCALE), MAX_SCALE);
  imageUploadPreview.style.transform = `scale(${scale / 100})`;
  scaleControlValue.value = `${scale}%`;
};

const onScaleControlSmallerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue - SCALE_STEP);
};

const onScaleControlBiggerClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  setScale(currentValue + SCALE_STEP);
};

const initScale = () => {
  setScale(DEFAULT_SCALE);
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
};

const destroyScale = () => {
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);
};

const resetScale = () => {
  setScale(DEFAULT_SCALE);
};

export { initScale, destroyScale, resetScale };
