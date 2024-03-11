import { picturesArray } from './data.js'

//# шаблон миниатюры
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

//# список-сетка миниатюр
const picturesListNode = document.querySelector('.pictures');

//# фрагмент
//! а для чего он нужен кстати?
const picturesListFragment = document.createDocumentFragment();

//# присвоение данных в шаблон миниатюр
picturesArray.forEach(
	({ id, url, description, likes, comments }) => {
		const pictureNode = pictureTemplate.cloneNode(true);
		pictureNode.querySelector('.picture__img').src = url;
		pictureNode.querySelector('.picture__img').alt = description;
		pictureNode.querySelector('.picture__likes').textContent = likes;
		pictureNode.querySelector('.picture__comments').textContent = comments.length;

		//# присвеоние миниатюре идентификатора, соответсвующего идентификатора
		pictureNode.setAttribute('id', id);

		picturesListFragment.append(pictureNode);
	}
);

picturesListNode.append(picturesListFragment);