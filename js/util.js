//@ функция, генерирующая случайное число в диапазоне
const getRandPosInt = (min, max) => {
	const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
	const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
	const result = Math.random() * (upper - lower + 1) + lower;

	return Math.floor(result);
};

//@ функция, выбирающая случайный элемент массива
const getRandomElement = (arr) => arr[getRandPosInt(0, arr.length - 1)];

//@ функция, создающая генераторы
const createIdGenerator = () => {
	let lastGeneratedId = 0;

	return function () {
		lastGeneratedId++;

		return lastGeneratedId;
	};
};

//@ функция-генератор идентификаторов
const generateId = createIdGenerator();

//@ функция, проверяющая, что нажатая клавиша - ESC
const isEscKey = (evt) => evt.key === 'Escape';

//@ функция, разбивающая по пробелу значение инпута на массив
const splitInput = (input) => {
	return input.value.split(' ');
};

export { getRandPosInt, getRandomElement, generateId, isEscKey, splitInput };