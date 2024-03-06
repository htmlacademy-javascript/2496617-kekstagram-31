import { createPictures } from './data.js'

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesListElement = document.querySelector('.pictures');

const pictures = createPictures();

const picturesListFragment = document.createDocumentFragment();

pictures.forEach(
	({ url, description, likes, comments }) => {
		const pictureElement = pictureTemplate.cloneNode(true);
		pictureElement.querySelector('.picture__img').src = url;
		pictureElement.querySelector('.picture__img').alt = description;
		pictureElement.querySelector('.picture__likes').textContent = likes;
		pictureElement.querySelector('.picture__comments').textContent = comments.length;

		picturesListFragment.append(pictureElement);
	}
);

picturesListElement.append(picturesListFragment);