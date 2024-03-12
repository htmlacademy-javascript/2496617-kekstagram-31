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
const PICTURES_NUMBER = 25;

//! критерий Д19
const MIN_COMMENTS_ID_COUNT = 1;
const MAX_COMMENTS_ID_COUNT = 1000;

const MIN_AVATAR_ID_COUNT = 1;
const MAX_AVATAR_ID_COUNT = 6;

const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 30;



//@ функция, создающия случайный комментарий
const createCommment = () => {
	return {
		id: getRandPosInt(MIN_COMMENTS_ID_COUNT, MAX_COMMENTS_ID_COUNT),
		avatar: `img/avatar-${getRandPosInt(MIN_AVATAR_ID_COUNT, MAX_AVATAR_ID_COUNT)}.svg`,
		message: getRandomElement(COMMENTS_EXAMPLES),
		name: getRandomElement(NAMES),
	}
}


//@ функция, создающая объект
const createPicture = () => {

	let generatedId = generateId();

	return {
		id: generatedId,
		url: `photos/${generatedId}.jpg`,
		description: `описание фотографии № ${generatedId}`,
		likes: getRandPosInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
		comments: Array.from({ length: getRandPosInt(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT) }, createCommment)
	}
}

//# создание результирующего массива
const picturesArray = Array.from({ length: PICTURES_NUMBER }, createPicture);

export { picturesArray }