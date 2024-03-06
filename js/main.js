//! нужно написать функции для создания МАССИВА из 25 сгенерированных объектов

// шаблон объекта
/*
const obj = {
	id: 'идентификатор опубликованной фотографии',   // это число от 1 до 25, не случайные, идентификаторы не повторяются
	url: 'адрес картинки',              // адресс картинки вида photos/num.jpg где num это число от 1 до 25, адреса не повторяются
	description: 'описание фотографии',        // описание придумать самостоятельно
	likes: 'описание фотографии',          // случайное число от 15 до 200
	comments: [                    // массив объектов-комментариев, количество комментариев к каждой фотографии - случайное от 0 до 30, все комментарии генерируются случайным образом
		{
			id: 135,                    // любое число, не повторяются
			avatar: 'img/avatar-6.svg',            // строка вида img/avatar-num.svg где num - случайное число от 1 до 6
			message: 'В целом всё неплохо. Но не всё.',    // для формирования текста комментария нужно взять одно или два случайных предложения из массива COMMENTS_EXAMPLES
			name: 'Артём',                  // имена должны быть случайными, набор имён - массив NAMES
		},
	],
}
*/

//# список комментариев
const COMMENTS_EXAMPLES = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент?!',
]


//# список имён
const NAMES = [
	'Дарья',
	'Александр',
	'Дмитрий',
	'Виктория',
	'Максим',
	'Тимофей',
	'Кирилл',
	'Варвара',
	'Мария',
	'Алина',
]

//# небоходимое количество объектов
const OBJECTS_NUMBER = 25;


//@ функция, генерирующая случайное число в диапазоне
const getRandPosInt = (min, max) => {
	const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
	const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
	const result = Math.random() * (upper - lower + 1) + lower;

	return Math.floor(result);
}


//@ функция, создающая генераторы
const createIdGenerator = () => {
	let lastGeneratedId = 0;

	return function () {
		lastGeneratedId++;

		return lastGeneratedId
	}
}


//@  функция-генератор идентификаторов
const generateId = createIdGenerator();


//@ функция, выбирающая случайный элемент массива
const getRandomElement = (arr) => arr[getRandPosInt(0, arr.length - 1)];


//@ функция, создающия случайный комментарий
const createCommment = () => {
	return {
		id: getRandPosInt(1, 1000),
		avatar: `img/avatar-${getRandPosInt(1, 6)}.svg`,
		message: getRandomElement(COMMENTS_EXAMPLES),
		name: getRandomElement(NAMES),
	}
}


//@ функция, создающая объект
const createObject = () => {

	let generatedId = generateId();

	return {
		id: generatedId,
		url: `photos/${generatedId}.jpg`,
		description: `описание фотографии № ${generatedId}`,
		likes: getRandPosInt(15, 200),
		comments: Array.from({ length: getRandPosInt(0, 30) }, createCommment)
	}
}

//# создание результирующего массива
const resultArray = Array.from({ length: OBJECTS_NUMBER }, createObject);

// eslint-disable-next-line no-console
console.log(resultArray);