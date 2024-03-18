import { getRandomPositiveInteger, getRandomElement, generateId } from "./util.js";

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

//# необходимое количество объектов
const PICTURES_NUMBER = 25;

//# минимальное и максимальное значение id комментария
const MIN_COMMENTS_ID_COUNT = 1;
const MAX_COMMENTS_ID_COUNT = 1000;

//# минимальное и максимальное значение id аватара
const MIN_AVATAR_ID_COUNT = 1;
const MAX_AVATAR_ID_COUNT = 6;

//# минимальное и максимальное количество лайков
const MIN_LIKES_AMOUNT = 15;
const MAX_LIKES_AMOUNT = 200;

//# минимальное и максимальное количество комментариев
const MIN_COMMENTS_AMOUNT = 0;
const MAX_COMMENTS_AMOUNT = 30;



//@ функция, создающая случайный комментарий
const createComment = () => {
	return {
		id: getRandomPositiveInteger(MIN_COMMENTS_ID_COUNT, MAX_COMMENTS_ID_COUNT),
		avatar: `img/avatar-${getRandomPositiveInteger(MIN_AVATAR_ID_COUNT, MAX_AVATAR_ID_COUNT)}.svg`,
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
		likes: getRandomPositiveInteger(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
		comments: Array.from({ length: getRandomPositiveInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT) }, createComment)
	}
}

//# создание результирующего массива
const picturesArray = Array.from({ length: PICTURES_NUMBER }, createPicture);

export { picturesArray }