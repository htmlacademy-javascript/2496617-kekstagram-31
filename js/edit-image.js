import '../vendor/nouislider/nouislider.js';

//# массив объектов-фильтров эффектов
const FILTERS = [
	{
		id: 'effect-none',
		filterValue: 'none',
	},
	{
		id: 'effect-chrome',
		filterValue: 'grayscale',
		min: 0,
		max: 1,
		step: 0.1,
		decimals: 1,
	},
	{
		id: 'effect-sepia',
		filterValue: 'sepia',
		min: 0,
		max: 1,
		step: 0.1,
		decimals: 1,
	},
	{
		id: 'effect-marvin',
		filterValue: 'invert',
		min: 0,
		max: 1,
		step: 0.01,
		decimals: 2,
	},
	{
		id: 'effect-phobos',
		filterValue: 'blur',
		min: 0,
		max: 3,
		step: 0.1,
		decimals: 1,
	},
	{
		id: 'effect-heat',
		filterValue: 'brightness',
		min: 1,
		max: 3,
		step: 0.1,
		decimals: 1,
	},
];


// $======================== IMAGE SIZE ========================$ //
// $======================== IMAGE SIZE ========================$ //

const SCALE_STEP = 25;
const PARSING_BASE = 10;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const scaleElement = document.querySelector('.img-upload__scale');
const scaleControlElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

//@ функция, меняющая размер картинки
const changeImageSize = () => {
	imageElement.style.transform = `scale(${scaleControlElement.value})`;
};

//# обработчик нажатия на кнопки +/-
const onScaleElementClick = (evt) => {
	const scaleControlNumber = parseInt(scaleControlElement.value, PARSING_BASE);

	if (evt.target.classList.contains('scale__control--smaller') &&
		scaleControlNumber > MIN_SCALE_VALUE) {
		scaleControlElement.value = scaleControlNumber - SCALE_STEP + '%';
	}
	if (evt.target.classList.contains('scale__control--bigger') &&
		scaleControlNumber < MAX_SCALE_VALUE) {
		scaleControlElement.value = scaleControlNumber + SCALE_STEP + '%';
	}

	changeImageSize();
};
// назначение обработчика в модуле upload-image.js


// $======================== EFFECTS ========================$ //
// $======================== EFFECTS ========================$ //

const effectLevelElement = document.querySelector('.effect-level');
effectLevelElement.style.display = 'none';

const effectSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');

//# инициализация слайдера
// ?------------ |> NOUISLIDER IS NOT DEFINED |>------------? //
// eslint-disable-next-line no-undef
noUiSlider.create(effectSliderElement, {
	start: 1,
	connect: 'lower',
	range: {
		min: 0,
		max: 1,
	},
	step: 0.1,
});


//# создание коллекции Map из массива объектов-эффектов, в которой элементы - это массивы пар [id - (сам)объект]
const filterEffectsMap = FILTERS.reduce((map, filterEffectObject) => {
	map.set(filterEffectObject.id, filterEffectObject);
	return map;
}, new Map());


//@ функция, настраивающая эффект
const adjustEffect = (filterValue, minValue = 0, maxValue = 1, stepValue = 0.1, decimals = 1) => {

	// обновление настроек слайдера
	effectSliderElement.noUiSlider.updateOptions({
		start: maxValue,
		range: {
			min: minValue,
			max: maxValue,
		},
		step: stepValue,
		format: {
			to: function (val) {
				if (Number.isInteger(val)) {
					return val.toFixed(0);
				}
				return val.toFixed(decimals);
			},
			from: function (val) {
				return parseFloat(val);
			},
		}
	});

	// изменение значения фильтра с помощью ползунка
	effectSliderElement.noUiSlider.on('update', () => {
		effectValueElement.value = effectSliderElement.noUiSlider.get();
		imageElement.style.filter = `${filterValue}(${effectValueElement.value})`;

		if (filterValue === 'blur') {
			imageElement.style.filter = `${filterValue}(${effectValueElement.value}px)`;
		}

		if (filterValue === 'none') {
			effectLevelElement.style.display = 'none';
			imageElement.style.filter = `${filterValue}`;
		} else {
			effectLevelElement.style.display = 'block';
		}
	});
};

//# обработчик выбора эффекта
const onEffectsListElementChange = (evt) => {
	const checkedInput = evt.target;
	if (checkedInput.tagName == 'INPUT') {
		const { filterValue, min, max, step, decimals } = filterEffectsMap.get(checkedInput.id);
		adjustEffect(filterValue, min, max, step, decimals);
	}
};
// назначение обработчика в модуле upload-image.js

// &------------------------ EXPORT ------------------------& //
export { scaleElement, onScaleElementClick, effectsListElement, onEffectsListElementChange };