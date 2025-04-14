import { EFFECTS } from './data.js';

const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.effect-level');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

let currentEffect = EFFECTS.none;

const applyEffect = (effectName, value) => {
  const effect = EFFECTS[effectName];

  if (!effect) {
    return;
  }

  effectLevelValue.value = parseFloat(value);

  if (effectName === 'none') {
    imageUploadPreview.style.filter = '';
    return;
  }

  imageUploadPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  applyEffect(currentEffect.name, sliderValue);
};

const onEffectChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }

  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];

  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    applyEffect(effectName, 0);
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    step: currentEffect.step,
    start: currentEffect.max
  });

  applyEffect(effectName, currentEffect.max);
};

const initEffectSlider = () => {
  if (effectLevelSlider.noUiSlider) {
    return;
  }

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  effectLevelContainer.classList.add('hidden');
};

const initEffect = () => {
  initEffectSlider();

  const selectedEffect = document.querySelector('.effects__radio:checked');
  if (selectedEffect && selectedEffect.value !== 'none') {
    currentEffect = EFFECTS[selectedEffect.value];
    effectLevelContainer.classList.remove('hidden');
  }

  effectsList.addEventListener('change', onEffectChange);
};

const destroyEffect = () => {
  effectsList.removeEventListener('change', onEffectChange);
};


const resetEffect = () => {
  currentEffect = EFFECTS.none;
  effectLevelContainer.classList.add('hidden');
  applyEffect('none', 0);

  const defaultEffectRadio = document.querySelector('#effect-none');
  if (defaultEffectRadio) {
    defaultEffectRadio.checked = true;
  }
};

export { initEffect, destroyEffect, resetEffect };
