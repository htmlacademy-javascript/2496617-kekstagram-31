import { getRandPosInt, getRandomElement, generateId } from "./util.js";

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